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
