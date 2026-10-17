---
title: Terminal
description: Displays a command the agent runs, with its output as it streams.
label: New
---

::prose-show-case

:DocsAiTerminal

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Terminal/DocsAiTerminal.vue" code lang="vue" -->

```vue [DocsAiTerminal.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ QUESTION }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-if="rows.length > 0 || text">
      <UiMessageContent class="gap-4">
        <UiTrace v-if="rows.length > 0">
          <UiTraceCollapsible
            v-for="row in rows"
            :key="row.id"
            :open="row.open"
            @update:open="openState[row.id] = $event"
          >
            <UiTraceCollapsibleTrigger>
              <UiTraceLine :status="row.status">
                <UiTraceIcon>
                  <Icon name="lucide:terminal" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>{{ row.title }}</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiCodeBlock size="sm">
                <UiCodeBlockContent wrap class="max-h-64">
                  {{ row.output }}
                </UiCodeBlockContent>
              </UiCodeBlock>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
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

  interface ToolPart {
    toolCallId: string;
    state: "input-available" | "output-available" | "output-error";
    input: { command: string };
    output?: { exitCode: number };
    errorText?: string;
  }

  const QUESTION = "Run the checks, then build the app.";
  const ANSWER = "Lint and tests pass, and the build compiled both routes.";

  const COMMANDS = [
    {
      id: "lint",
      command: "pnpm lint",
      output: ["> acme-chat@0.1.0 lint", "> eslint ."],
    },
    {
      id: "test",
      command: "pnpm test",
      output: [
        "> acme-chat@0.1.0 test",
        "> vitest run",
        "",
        " ✓ utils/ai.test.ts (6 tests) 41ms",
        " ✓ components/Chat.test.ts (9 tests) 212ms",
        "",
        " Test Files  2 passed (2)",
        "      Tests  15 passed (15)",
      ],
    },
    {
      id: "build",
      command: "pnpm build",
      output: [
        "> acme-chat@0.1.0 build",
        "> nuxt build",
        "",
        "Nuxt 4.2.0 with Nitro 2.12.0",
        "ℹ Building client...",
        "✔ Client built in 4210ms",
        "ℹ Building server...",
        "✔ Server built in 1180ms",
        "",
        "✔ Generated public .output/public",
        "├─ .output/server/chunks/routes/index.mjs (1.9 kB)",
        "└─ .output/server/chunks/routes/api/chat.post.mjs (141 B)",
      ],
    },
  ];

  function finalTools(): ToolPart[] {
    return COMMANDS.map(({ id, command }) => ({
      toolCallId: id,
      state: "output-available",
      input: { command },
      output: { exitCode: 0 },
    }));
  }

  function finalOutputs() {
    return Object.fromEntries(COMMANDS.map(({ id, output }) => [id, output.join("\n")]));
  }

  const tools = ref<ToolPart[]>(finalTools());
  // The data-terminal parts, keyed by the tool call id.
  const outputs = ref<Record<string, string>>(finalOutputs());
  const text = ref(ANSWER);
  const busy = ref(false);
  // Open the last command when the transcript is not streaming.
  const openState = ref<Record<string, boolean>>({ build: true });

  function getTitle(part: ToolPart, running: boolean) {
    const command = part.input.command;

    if (part.state === "output-available") {
      return part.output?.exitCode === 0
        ? `Ran ${command}`
        : `${command} exited with code ${part.output?.exitCode}`;
    }

    return running ? `Running ${command}` : `Failed to run ${command}`;
  }

  const rows = computed(() =>
    tools.value.map((part) => {
      const output = outputs.value[part.toolCallId] ?? "";
      const running = busy.value && part.state === "input-available";
      const failed = !running && (part.state !== "output-available" || part.output?.exitCode !== 0);

      return {
        id: part.toolCallId,
        title: getTitle(part, running),
        status: running ? ("running" as const) : failed ? ("error" as const) : undefined,
        open: openState.value[part.toolCallId] ?? (running && output.length > 0),
        output: part.state === "output-error" ? part.errorText : output,
      };
    })
  );

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
    tools.value = [];
    outputs.value = {};
    text.value = "";
    openState.value = {};

    for (const { id: toolCallId, command, output } of COMMANDS) {
      tools.value.push({ toolCallId, state: "input-available", input: { command } });

      // The tool streams its output as a data part with the tool call's id.
      for (let index = 0; index < output.length; index++) {
        outputs.value[toolCallId] = output.slice(0, index + 1).join("\n");
        if (!(await wait(200, id))) return;
      }

      const part = tools.value.find((tool) => tool.toolCallId === toolCallId)!;
      part.state = "output-available";
      part.output = { exitCode: 0 };
    }

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

Terminal is a shell command the agent runs, such as a lint, a test run or a build. The line shows the command, and its output streams in underneath while it runs.

Terminal is built with `UiTrace` with a `UiTraceCollapsible` for each command.

## Installation

Terminal is built with the [Trace](/components/trace) and [Code Block](/components/code-block) components.

:prose-pm-x{command="ui-thing@latest add trace code-block"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:terminal" />
          </UiTraceIcon>
          <UiTraceTitle>Ran pnpm build</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ output }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  defineProps<{ output: string }>();
</script>
```

## Exit Code

A command that exits with any code other than `0` failed. Set `status="error"`.

::prose-show-case

:DocsAiTerminalError

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Terminal/DocsAiTerminalError.vue" code lang="vue" -->

```vue [DocsAiTerminalError.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm install</UiTraceTitle>
    </UiTraceLine>
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>pnpm lint exited with code 1</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ LINT_OUTPUT }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const LINT_OUTPUT = `> acme-chat@0.1.0 lint
> eslint .

server/api/chat.post.ts
  14:7  error  'model' is assigned a value but never used  no-unused-vars

components/Chat.vue
  42:5  error  'messages' is defined but never used  vue/no-unused-vars

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.`;
</script>
```

<!-- /automd -->

::

| Command                  | `status`    | Title                        |
| ------------------------ | ----------- | ---------------------------- |
| Running                  | `"running"` | Running pnpm build           |
| Exited with `0`          | none        | Ran pnpm build               |
| Exited with another code | `"error"`   | pnpm lint exited with code 1 |

The command is a tool call, so its states map the same way as in [Tool](/ai-elements/tool#states).

## Open While Running

Open the line once the first output arrives, so the output is visible while the command runs. Leave it open or closed after that, as in [Trace](/components/trace#open-state).

## AI SDK

A tool result arrives only once the command exits. To stream the output while it runs, write it from the tool as a data part with the tool call's id. The AI SDK replaces a data part that has the same id, so the output grows in place.

```ts
writer.write({
  type: "data-terminal",
  id: toolCallId,
  data: { output },
});
```

On the client, find the data part that matches each tool part.

```ts
function getOutput(message: ChatMessage, toolCallId: string) {
  for (const part of message.parts) {
    if (part.type === "data-terminal" && part.id === toolCallId) {
      return part.data.output;
    }
  }

  return "";
}
```

## API Reference

See [Trace](/components/trace#api-reference).
