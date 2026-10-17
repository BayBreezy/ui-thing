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
