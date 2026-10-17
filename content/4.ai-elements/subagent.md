---
title: Subagent
description: Displays a subagent run, with its tool calls and result.
label: New
---

::prose-show-case

:DocsAiSubagent

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Subagent/DocsAiSubagent.vue" code lang="vue" -->

```vue [DocsAiSubagent.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ QUESTION }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-if="row || text">
      <UiMessageContent class="gap-4">
        <UiTrace v-if="row">
          <UiTraceCollapsible v-if="row.hasParts" default-open :unmount-on-hide="false">
            <UiTraceCollapsibleTrigger>
              <UiTraceLine :status="row.status">
                <UiTraceIcon>
                  <Icon v-if="row.done" name="lucide:circle-check" class="size-4" />
                  <Icon
                    v-else-if="row.running"
                    name="lucide:loader-circle"
                    class="size-4 animate-spin"
                  />
                  <Icon v-else name="lucide:circle-alert" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>{{ row.title }}</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent class="flex flex-col gap-3">
              <UiTrace>
                <template v-for="step in row.steps" :key="step.toolCallId">
                  <UiTraceCollapsible v-if="step.state === 'output-available'">
                    <UiTraceCollapsibleTrigger>
                      <UiTraceLine>
                        <UiTraceIcon>
                          <Icon name="lucide:circle-check" class="size-4" />
                        </UiTraceIcon>
                        <UiTraceTitle>Ran {{ step.input.command }}</UiTraceTitle>
                      </UiTraceLine>
                    </UiTraceCollapsibleTrigger>
                    <UiTraceCollapsibleContent>
                      <UiCodeBlock size="sm">
                        <UiCodeBlockContent wrap class="max-h-64">
                          {{ step.output.stdout }}
                        </UiCodeBlockContent>
                      </UiCodeBlock>
                    </UiTraceCollapsibleContent>
                  </UiTraceCollapsible>
                  <UiTraceLine v-else :status="row.running ? 'running' : 'error'">
                    <UiTraceIcon>
                      <Icon
                        v-if="row.running"
                        name="lucide:loader-circle"
                        class="size-4 animate-spin"
                      />
                      <Icon v-else name="lucide:circle-alert" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>
                      {{ row.running ? "Running" : "Failed to run" }} {{ step.input.command }}
                    </UiTraceTitle>
                  </UiTraceLine>
                </template>
              </UiTrace>
              <p v-if="row.report">
                {{ row.report }}
              </p>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
          <UiTraceLine v-else :status="row.status">
            <UiTraceIcon>
              <Icon v-if="row.done" name="lucide:circle-check" class="size-4" />
              <Icon
                v-else-if="row.running"
                name="lucide:loader-circle"
                class="size-4 animate-spin"
              />
              <Icon v-else name="lucide:circle-alert" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>{{ row.title }}</UiTraceTitle>
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

  type SubagentPart =
    | { type: "text"; text: string }
    | {
        type: "tool-runCommand";
        toolCallId: string;
        state: "input-available";
        input: { command: string };
      }
    | {
        type: "tool-runCommand";
        toolCallId: string;
        state: "output-available";
        input: { command: string };
        output: { stdout: string };
      };

  interface AgentPart {
    state: "input-available" | "output-available" | "output-error";
    preliminary?: boolean;
    output?: { parts: SubagentPart[] };
  }

  const QUESTION = "Why does image optimization rerun on every deploy?";
  const REPORT =
    "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again.";
  const ANSWER =
    "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped.";

  const steps = [
    {
      command: "grep -rn cacheKey scripts",
      stdout: "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
    },
    {
      command: "sed -n 13,15p scripts/optimize-images.ts",
      stdout:
        'const cacheDir = ".nuxt/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
    },
    {
      command: "ls public/images | wc -l",
      stdout: "1240",
    },
  ];

  function getSubagentParts(done: number, report?: string): SubagentPart[] {
    const parts: SubagentPart[] = steps.slice(0, done).map((step, index) => ({
      type: "tool-runCommand",
      toolCallId: `step-${index}`,
      state: "output-available",
      input: { command: step.command },
      output: { stdout: step.stdout },
    }));

    if (done < steps.length) {
      parts.push({
        type: "tool-runCommand",
        toolCallId: `step-${done}`,
        state: "input-available",
        input: { command: steps[done]!.command },
      });
    }

    if (report) parts.push({ type: "text", text: report });

    return parts;
  }

  const agent = ref<AgentPart | undefined>({
    state: "output-available",
    output: { parts: getSubagentParts(steps.length, REPORT) },
  });
  const text = ref(ANSWER);
  const busy = ref(false);

  const row = computed(() => {
    const part = agent.value;
    if (!part) return undefined;

    const done = part.state === "output-available" && !part.preliminary;
    const running = !done && part.state !== "output-error" && busy.value;
    const parts = part.state === "output-available" ? (part.output?.parts ?? []) : [];
    const report = parts
      .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
      .join("");

    return {
      done,
      running,
      status: done ? undefined : running ? ("running" as const) : ("error" as const),
      title: `${done ? "Ran" : running ? "Running" : "Failed to run"} the research subagent`,
      steps: parts.filter((agentPart) => agentPart.type === "tool-runCommand"),
      hasParts: parts.length > 0,
      report,
    };
  });

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
    agent.value = undefined;
    text.value = "";

    agent.value = { state: "input-available" };
    if (!(await wait(600, id))) return;

    for (let index = 0; index < steps.length; index++) {
      agent.value = {
        state: "output-available",
        preliminary: true,
        output: { parts: getSubagentParts(index) },
      };
      if (!(await wait(1000, id))) return;
    }

    agent.value = {
      state: "output-available",
      output: { parts: getSubagentParts(steps.length, REPORT) },
    };
    if (!(await wait(400, id))) return;

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

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `UiTrace` with a `UiTraceCollapsible` for the run and a nested `UiTrace` for its tool calls.

## Installation

Subagent is built with the [Trace](/components/trace), [Code Block](/components/code-block) and [Badge](/components/badge) components.

:prose-pm-x{command="ui-thing@latest add trace code-block badge"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:circle-check" />
          </UiTraceIcon>
          <UiTraceTitle>Ran the research agent</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-3">
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:circle-check" />
            </UiTraceIcon>
            <UiTraceTitle>Ran grep -rn cacheKey scripts</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
        <p>The cache is keyed on the commit SHA.</p>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

::prose-show-case

:DocsAiSubagentRunning

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Subagent/DocsAiSubagentRunning.vue" code lang="vue" -->

```vue [DocsAiSubagentRunning.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="running">
          <UiTraceIcon>
            <Icon name="lucide:loader-circle" class="size-4 animate-spin" />
          </UiTraceIcon>
          <UiTraceTitle>Running the research agent</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:circle-check" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Ran grep -rn cacheKey scripts</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine status="running">
            <UiTraceIcon>
              <Icon name="lucide:loader-circle" class="size-4 animate-spin" />
            </UiTraceIcon>
            <UiTraceTitle> Running sed -n 13,15p scripts/optimize-images.ts </UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/components/badge) items. Show how long it ran in a `UiTraceDescription` after the title.

::prose-show-case

:DocsAiSubagentDetails

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Subagent/DocsAiSubagentDetails.vue" code lang="vue" -->

```vue [DocsAiSubagentDetails.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:circle-check" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran the research agent</UiTraceTitle>
          <UiTraceDescription>48s</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-1.5">
          <UiBadge variant="secondary"> anthropic/claude-sonnet-4.5 </UiBadge>
          <UiBadge variant="outline" class="font-mono"> runCommand </UiBadge>
        </div>
        <p>Find out why image optimization reruns on every deploy.</p>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:circle-check" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Ran grep -rn cacheKey scripts</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:circle-check" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle> Ran sed -n 13,15p scripts/optimize-images.ts </UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
        <p>The cache is keyed on the commit SHA.</p>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `UiTrace`. Map each nested tool part as in [Tool](/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `UiTraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## API Reference

See [Trace](/components/trace#api-reference).
