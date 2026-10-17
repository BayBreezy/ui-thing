---
title: Test Results
description: Displays a test run by the agent, with its suites and failures.
label: New
---

::prose-show-case

:DocsAiTestResults

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/TestResults/DocsAiTestResults.vue" code lang="vue" -->

```vue [DocsAiTestResults.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ QUESTION }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-if="part || text">
      <UiMessageContent class="gap-4">
        <UiTrace v-if="part">
          <UiTraceCollapsible
            v-if="part.state === 'output-available'"
            :default-open="summary.failed > 0"
            :unmount-on-hide="false"
          >
            <UiTraceCollapsibleTrigger>
              <UiTraceLine :status="summary.failed > 0 ? 'error' : undefined">
                <UiTraceIcon>
                  <Icon name="lucide:flask-conical" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Ran {{ formatCounts(summary) }}</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <UiTraceCollapsible
                  v-for="suite in suites"
                  :key="suite.name"
                  :default-open="suite.counts.failed > 0"
                  :unmount-on-hide="false"
                >
                  <UiTraceCollapsibleTrigger>
                    <UiTraceLine :status="suite.counts.failed > 0 ? 'error' : undefined">
                      <UiTraceIcon>
                        <Icon name="lucide:file-code" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>
                        {{ suite.name }}, {{ formatCounts(suite.counts) }}
                      </UiTraceTitle>
                    </UiTraceLine>
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent>
                    <UiTrace>
                      <template v-for="test in suite.tests" :key="test.name">
                        <UiTraceCollapsible v-if="test.status === 'failed'" default-open>
                          <UiTraceCollapsibleTrigger>
                            <UiTraceLine status="error">
                              <UiTraceIcon>
                                <Icon name="lucide:x" class="size-4" />
                              </UiTraceIcon>
                              <UiTraceTitle>{{ test.name }}</UiTraceTitle>
                            </UiTraceLine>
                          </UiTraceCollapsibleTrigger>
                          <UiTraceCollapsibleContent>
                            <UiCodeBlock size="sm">
                              <UiCodeBlockContent wrap class="max-h-64">
                                {{ test.error }}
                              </UiCodeBlockContent>
                            </UiCodeBlock>
                          </UiTraceCollapsibleContent>
                        </UiTraceCollapsible>
                        <UiTraceLine v-else>
                          <UiTraceIcon>
                            <Icon
                              v-if="test.status === 'skipped'"
                              name="lucide:circle-dashed"
                              class="size-4"
                            />
                            <Icon v-else name="lucide:check" class="size-4" />
                          </UiTraceIcon>
                          <UiTraceTitle>
                            {{ test.status === "skipped" ? `Skipped ${test.name}` : test.name }}
                          </UiTraceTitle>
                        </UiTraceLine>
                      </template>
                    </UiTrace>
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
              </UiTrace>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
          <UiTraceLine v-else :status="busy && part.state !== 'output-error' ? 'running' : 'error'">
            <UiTraceIcon>
              <Icon name="lucide:flask-conical" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>
              {{ busy && part.state !== "output-error" ? "Running" : "Failed to run" }}
              {{ part.input.command }}
            </UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
        <p v-if="text">
          {{ text }}
        </p>
      </UiMessageContent>
    </UiMessage>
    <UiButton v-if="!busy" variant="outline" size="sm" class="mt-auto self-start" @click="replay">
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface Test {
    name: string;
    status: "passed" | "failed" | "skipped";
    error?: string;
  }

  interface ToolPart {
    toolCallId: string;
    state: "input-available" | "output-available" | "output-error";
    input: { command: string };
    output?: { suites: { name: string; tests: Test[] }[] };
  }

  const QUESTION = "Run the checkout tests.";
  const ANSWER =
    "One test failed. The payment client does not retry a declined card, so the second charge attempt never happens.";

  const OUTPUT: NonNullable<ToolPart["output"]> = {
    suites: [
      {
        name: "cart.test.ts",
        tests: [
          { name: "adds an item", status: "passed" },
          { name: "removes an item", status: "passed" },
          { name: "applies a discount code", status: "passed" },
        ],
      },
      {
        name: "payment.test.ts",
        tests: [
          { name: "charges the saved card", status: "passed" },
          {
            name: "retries a declined card",
            status: "failed",
            error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
          },
        ],
      },
    ],
  };

  const part = ref<ToolPart | undefined>({
    toolCallId: "tests",
    state: "output-available",
    input: { command: "pnpm test checkout" },
    output: OUTPUT,
  });
  const text = ref(ANSWER);
  const busy = ref(false);

  function countTests(tests: Test[]) {
    return {
      total: tests.length,
      failed: tests.filter((test) => test.status === "failed").length,
      skipped: tests.filter((test) => test.status === "skipped").length,
    };
  }

  function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
    return [`${total} tests`, failed > 0 && `${failed} failed`, skipped > 0 && `${skipped} skipped`]
      .filter(Boolean)
      .join(", ");
  }

  const suites = computed(() =>
    (part.value?.output?.suites ?? []).map((suite) => ({
      ...suite,
      counts: countTests(suite.tests),
    }))
  );
  const summary = computed(() => countTests(suites.value.flatMap((suite) => suite.tests)));

  // Unmounting bumps `run`, so a running script stops at its next wait.
  let run = 0;
  tryOnScopeDispose(() => run++);

  async function wait(ms: number, id: number) {
    await promiseTimeout(ms);
    return id === run;
  }

  async function replay() {
    const id = ++run;
    busy.value = true;
    text.value = "";

    part.value = {
      toolCallId: "tests",
      state: "input-available",
      input: { command: "pnpm test checkout" },
    };
    if (!(await wait(1500, id))) return;
    part.value = { ...part.value, state: "output-available", output: OUTPUT };

    for (const word of ANSWER.split(/(?<= )/)) {
      if (!(await wait(20, id))) return;
      text.value += word;
    }

    busy.value = false;
  }
</script>
```

<!-- /automd -->

::

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `UiTrace` with a `UiTraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/components/trace) and [Code Block](/components/code-block) components.

:prose-pm-x{command="ui-thing@latest add trace code-block"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <UiIcon name="lucide:flask-conical" />
          </UiTraceIcon>
          <UiTraceTitle>Ran 2 tests, 1 failed</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:check" />
            </UiTraceIcon>
            <UiTraceTitle>creates a user</UiTraceTitle>
          </UiTraceLine>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine status="error">
                <UiTraceIcon>
                  <UiIcon name="lucide:x" />
                </UiTraceIcon>
                <UiTraceTitle>updates a user profile</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiCodeBlock size="sm">
                <UiCodeBlockContent wrap class="max-h-64">
                  Expected status 200, received 500
                </UiCodeBlockContent>
              </UiCodeBlock>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Suites

Group tests by file. Each suite is a collapsible line with a `UiTrace` of its tests. Open the suites that have a failure.

::prose-show-case

:DocsAiTestResultsSuites

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/TestResults/DocsAiTestResultsSuites.vue" code lang="vue" -->

```vue [DocsAiTestResultsSuites.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine :status="summary.failed > 0 ? 'error' : undefined">
          <UiTraceIcon>
            <Icon name="lucide:flask-conical" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran {{ formatCounts(summary) }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceCollapsible
            v-for="suite in suites"
            :key="suite.name"
            :default-open="countTests(suite.tests).failed > 0"
            :unmount-on-hide="false"
          >
            <UiTraceCollapsibleTrigger>
              <UiTraceLine :status="countTests(suite.tests).failed > 0 ? 'error' : undefined">
                <UiTraceIcon>
                  <Icon name="lucide:file-code" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{ suite.name }}, {{ formatCounts(countTests(suite.tests)) }}
                </UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <template v-for="test in suite.tests" :key="test.name">
                  <UiTraceCollapsible v-if="test.status === 'failed'">
                    <UiTraceCollapsibleTrigger>
                      <UiTraceLine status="error">
                        <UiTraceIcon>
                          <Icon name="lucide:x" class="size-4" />
                        </UiTraceIcon>
                        <UiTraceTitle>{{ test.name }}</UiTraceTitle>
                      </UiTraceLine>
                    </UiTraceCollapsibleTrigger>
                    <UiTraceCollapsibleContent>
                      <UiCodeBlock size="sm">
                        <UiCodeBlockContent wrap class="max-h-64">
                          {{ test.error }}
                        </UiCodeBlockContent>
                      </UiCodeBlock>
                    </UiTraceCollapsibleContent>
                  </UiTraceCollapsible>
                  <UiTraceLine v-else>
                    <UiTraceIcon>
                      <Icon
                        v-if="test.status === 'skipped'"
                        name="lucide:circle-dashed"
                        class="size-4"
                      />
                      <Icon v-else name="lucide:check" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>
                      {{ test.status === "skipped" ? `Skipped ${test.name}` : test.name }}
                    </UiTraceTitle>
                  </UiTraceLine>
                </template>
              </UiTrace>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  interface Test {
    name: string;
    status: "passed" | "failed" | "skipped";
    error?: string;
  }

  const suites: { name: string; tests: Test[] }[] = [
    {
      name: "auth.test.ts",
      tests: [
        { name: "logs in with valid credentials", status: "passed" },
        { name: "rejects an invalid password", status: "passed" },
        { name: "refreshes an expired token", status: "passed" },
      ],
    },
    {
      name: "user-api.test.ts",
      tests: [
        { name: "creates a user", status: "passed" },
        {
          name: "updates a user profile",
          status: "failed",
          error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`,
        },
        { name: "deletes a user", status: "skipped" },
      ],
    },
    {
      name: "db.test.ts",
      tests: [
        { name: "connects to the database", status: "passed" },
        {
          name: "times out a slow query",
          status: "failed",
          error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`,
        },
      ],
    },
  ];

  function countTests(tests: Test[]) {
    return {
      total: tests.length,
      failed: tests.filter((test) => test.status === "failed").length,
      skipped: tests.filter((test) => test.status === "skipped").length,
    };
  }

  function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
    return [`${total} tests`, failed > 0 && `${failed} failed`, skipped > 0 && `${skipped} skipped`]
      .filter(Boolean)
      .join(", ");
  }

  const summary = countTests(suites.flatMap((suite) => suite.tests));
</script>
```

<!-- /automd -->

::

```vue
<template>
  <UiTraceCollapsible :default-open="failed > 0">
    <UiTraceCollapsibleTrigger>
      <UiTraceLine :status="failed > 0 ? 'error' : undefined">
        <UiTraceIcon>
          <FileCodeIcon />
        </UiTraceIcon>
        <UiTraceTitle>user-api.test.ts, 14 tests, 2 failed</UiTraceTitle>
      </UiTraceLine>
    </UiTraceCollapsibleTrigger>
    <UiTraceCollapsibleContent>
      <UiTrace>…</UiTrace>
    </UiTraceCollapsibleContent>
  </UiTraceCollapsible>
</template>
```

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/ai-elements/tool#states).

```vue
<template>
  <UiTraceCollapsible :default-open="failed > 0">
    <UiTraceCollapsibleTrigger>
      <UiTraceLine :status="failed > 0 ? 'error' : undefined">
        <UiTraceIcon>
          <FlaskConicalIcon />
        </UiTraceIcon>
        <UiTraceTitle>
          Ran {{ tests.length }} tests<template v-if="failed > 0">, {{ failed }} failed</template>
        </UiTraceTitle>
      </UiTraceLine>
    </UiTraceCollapsibleTrigger>
    <UiTraceCollapsibleContent>…</UiTraceCollapsibleContent>
  </UiTraceCollapsible>
</template>

<script lang="ts" setup>
  const tests = computed(() => props.part.output.suites.flatMap((suite) => suite.tests));
  const failed = computed(() => tests.value.filter((test) => test.status === "failed").length);
</script>
```

## API Reference

See [Trace](/components/trace#api-reference).
