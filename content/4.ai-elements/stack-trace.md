---
title: Stack Trace
description: Displays a failed tool call and its stack frames.
label: New
---

::prose-show-case

:DocsAiStackTrace

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/StackTrace/DocsAiStackTrace.vue" code lang="vue" -->

```vue [DocsAiStackTrace.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ QUESTION }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-if="tools.length > 0 || text">
      <UiMessageContent class="gap-4">
        <UiTrace v-if="tools.length > 0">
          <template v-for="part in tools" :key="part.toolCallId">
            <UiTraceCollapsible v-if="part.state === 'output-error'" default-open>
              <UiTraceCollapsibleTrigger>
                <UiTraceLine status="error">
                  <UiTraceIcon>
                    <Icon name="lucide:terminal" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>Failed: {{ part.error.error }}</UiTraceTitle>
                </UiTraceLine>
              </UiTraceCollapsibleTrigger>
              <UiTraceCollapsibleContent class="flex flex-col gap-2">
                <p class="text-destructive font-mono text-xs">
                  {{ part.error.error }}
                </p>
                <UiTrace>
                  <a
                    v-for="frame in part.error.appFrames"
                    :key="frame.line"
                    :href="`#${frame.file}:${frame.lineNumber}`"
                  >
                    <UiTraceLine>
                      <UiTraceIcon>
                        <Icon name="lucide:file-code" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>
                        {{ frame.name }} in {{ frame.file }}:{{ frame.lineNumber }}
                      </UiTraceTitle>
                    </UiTraceLine>
                  </a>
                  <UiTraceCollapsible>
                    <UiTraceCollapsibleTrigger>
                      <UiTraceLine>
                        <UiTraceIcon>
                          <Icon name="lucide:layers" class="size-4" />
                        </UiTraceIcon>
                        <UiTraceTitle>
                          {{ part.error.internalFrames.length }} framework frames
                        </UiTraceTitle>
                      </UiTraceLine>
                    </UiTraceCollapsibleTrigger>
                    <UiTraceCollapsibleContent>
                      <ol
                        class="bg-muted flex flex-col gap-1 overflow-x-auto rounded-md p-3 font-mono text-xs"
                      >
                        <li
                          v-for="frame in part.error.internalFrames"
                          :key="frame.line"
                          class="whitespace-nowrap"
                        >
                          {{ frame.line }}
                        </li>
                      </ol>
                    </UiTraceCollapsibleContent>
                  </UiTraceCollapsible>
                </UiTrace>
              </UiTraceCollapsibleContent>
            </UiTraceCollapsible>
            <UiTraceCollapsible v-else-if="part.state === 'output-available'">
              <UiTraceCollapsibleTrigger>
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon name="lucide:terminal" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>Ran {{ part.input.command }}</UiTraceTitle>
                </UiTraceLine>
              </UiTraceCollapsibleTrigger>
              <UiTraceCollapsibleContent>
                <UiCodeBlock size="sm">
                  <UiCodeBlockContent wrap class="max-h-64">
                    {{ part.output.stdout }}
                  </UiCodeBlockContent>
                </UiCodeBlock>
              </UiTraceCollapsibleContent>
            </UiTraceCollapsible>
            <UiTraceLine v-else :status="busy ? 'running' : 'error'">
              <UiTraceIcon>
                <Icon name="lucide:terminal" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ busy ? "Running" : "Failed to run" }} {{ part.input.command }}
              </UiTraceTitle>
            </UiTraceLine>
          </template>
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

  type ToolPart =
    | { toolCallId: string; state: "input-available"; input: { command: string } }
    | {
        toolCallId: string;
        state: "output-available";
        input: { command: string };
        output: { stdout: string };
      }
    | {
        toolCallId: string;
        state: "output-error";
        input: { command: string };
        errorText: string;
        error: ReturnType<typeof parseStack>;
      };

  const QUESTION = "Reset the database and seed it.";
  const ANSWER =
    "The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined.";

  const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)`;

  const RESET_OUTPUT = `Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/`;

  function parseFrame(line: string) {
    const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/);

    return {
      line,
      name: match?.[1],
      file: match?.[2],
      lineNumber: match?.[3],
      internal: line.includes("node_modules") || line.includes("node:"),
    };
  }

  function parseStack(stack: string) {
    const [error, ...lines] = stack.split("\n").map((line) => line.trim());
    const frames = lines.map(parseFrame);

    return {
      error,
      appFrames: frames.filter((frame) => !frame.internal),
      internalFrames: frames.filter((frame) => frame.internal),
    };
  }

  function finalTools(): ToolPart[] {
    return [
      {
        toolCallId: "reset",
        state: "output-available",
        input: { command: "pnpm prisma migrate reset --skip-seed" },
        output: { stdout: RESET_OUTPUT },
      },
      {
        toolCallId: "seed",
        state: "output-error",
        input: { command: "pnpm prisma db seed" },
        errorText: STACK,
        error: parseStack(STACK),
      },
    ];
  }

  const tools = ref<ToolPart[]>(finalTools());
  const text = ref(ANSWER);
  const busy = ref(false);

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

    const [reset, seed] = finalTools();

    tools.value = [
      { toolCallId: reset!.toolCallId, state: "input-available", input: reset!.input },
    ];
    if (!(await wait(900, id))) return;
    tools.value = [reset!];

    tools.value = [
      reset!,
      { toolCallId: seed!.toolCallId, state: "input-available", input: seed!.input },
    ];
    if (!(await wait(1200, id))) return;
    tools.value = [reset!, seed!];

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

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `UiTrace` with a `UiTraceCollapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/components/trace) and [Code Block](/components/code-block) components.

:prose-pm-x{command="ui-thing@latest add trace code-block"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <UiIcon name="lucide:circle-x" />
          </UiTraceIcon>
          <UiTraceTitle>Failed: {{ error }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <div class="bg-muted flex flex-col gap-2 rounded-md p-3 font-mono text-xs">
          <p class="text-destructive">
            {{ error }}
          </p>
          <ol>
            <li
              v-for="(frame, index) in frames"
              :key="index"
              :class="frame.includes('node_modules') ? undefined : 'text-foreground'"
            >
              {{ frame }}
            </li>
          </ol>
        </div>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const props = defineProps<{ stack: string }>();

  const lines = computed(() => props.stack.split("\n").map((line) => line.trim()));
  const error = computed(() => lines.value[0]);
  const frames = computed(() => lines.value.slice(1));
</script>
```

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

::prose-show-case

:DocsAiStackTraceFrames

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/StackTrace/DocsAiStackTraceFrames.vue" code lang="vue" -->

```vue [DocsAiStackTraceFrames.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <Icon name="lucide:circle-x" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Failed: {{ error }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-2">
        <p class="text-destructive font-mono text-xs">
          {{ error }}
        </p>
        <UiTrace>
          <a
            v-for="frame in appFrames"
            :key="frame.line"
            :href="`#${frame.file}:${frame.lineNumber}`"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:file-code" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ frame.name }} in {{ frame.file }}:{{ frame.lineNumber }}
              </UiTraceTitle>
            </UiTraceLine>
          </a>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon name="lucide:layers" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle> {{ internalFrames.length }} framework frames </UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <ol
                class="bg-muted flex flex-col gap-1 overflow-x-auto rounded-md p-3 font-mono text-xs"
              >
                <li v-for="frame in internalFrames" :key="frame.line" class="whitespace-nowrap">
                  {{ frame.line }}
                </li>
              </ol>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const STACK = `TypeError: Cannot read properties of undefined (reading 'total')
    at formatInvoice (app/utils/billing.ts:42:31)
    at setup (app/components/InvoiceRow.vue:18:12)
    at callWithErrorHandling (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:200:19)
    at setupStatefulComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7848:25)
    at setupComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7809:36)
    at mountComponent (node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5159:7)`;

  function parseFrame(line: string) {
    const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/);

    return {
      line,
      name: match?.[1],
      file: match?.[2],
      lineNumber: match?.[3],
      internal: line.includes("node_modules"),
    };
  }

  const [error, ...lines] = STACK.split("\n").map((line) => line.trim());
  const frames = lines.map(parseFrame);
  const appFrames = frames.filter((frame) => !frame.internal);
  const internalFrames = frames.filter((frame) => frame.internal);
</script>
```

<!-- /automd -->

::

## AI SDK

When a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them.

```ts
return result.toUIMessageStreamResponse({
  onError: (error) => (error instanceof Error ? (error.stack ?? error.message) : String(error)),
});
```

A stack shows file paths from your server, so only send it in development.

```vue
<template>
  <UiTraceCollapsible v-if="part.state === 'output-error'"> … </UiTraceCollapsible>
</template>

<script lang="ts" setup>
  const [error, ...frames] = part.errorText.split("\n").map((line) => line.trim());
</script>
```

Map the other tool states as in [Tool](/ai-elements/tool#states).

## API Reference

See [Trace](/components/trace#api-reference).
