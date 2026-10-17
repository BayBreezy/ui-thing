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
