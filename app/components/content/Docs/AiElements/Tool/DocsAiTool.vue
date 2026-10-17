<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ getText(message) }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent class="gap-4">
          <UiTrace v-if="getTools(message).length > 0">
            <template v-for="part in getTools(message)" :key="part.toolCallId">
              <UiTraceCollapsible
                v-if="part.state === 'output-available' || part.state === 'output-error'"
                :default-open="initial && part.state === 'output-error'"
              >
                <UiTraceCollapsibleTrigger>
                  <UiTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                    <UiTraceIcon>
                      <Icon name="lucide:terminal" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>
                      {{ part.state === "output-error" ? "Failed to run" : "Ran" }}
                      {{ part.input.command }}
                    </UiTraceTitle>
                  </UiTraceLine>
                </UiTraceCollapsibleTrigger>
                <UiTraceCollapsibleContent>
                  <UiCodeBlock size="sm">
                    <UiCodeBlockContent wrap class="max-h-64">
                      {{ part.state === "output-error" ? part.errorText : part.output?.stdout }}
                    </UiCodeBlockContent>
                  </UiCodeBlock>
                </UiTraceCollapsibleContent>
              </UiTraceCollapsible>
              <UiTraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                <UiTraceIcon>
                  <Icon name="lucide:terminal" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{ isStreaming(message) ? "Running" : "Failed to run" }} {{ part.input.command }}
                </UiTraceTitle>
              </UiTraceLine>
            </template>
          </UiTrace>
          <p v-if="getText(message)">
            {{ getText(message) }}
          </p>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton v-if="!busy" variant="outline" size="sm" class="mt-auto self-start" @click="replay">
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface ToolPart {
    type: "tool-runCommand";
    toolCallId: string;
    state: "input-available" | "output-available" | "output-error";
    input: { command: string };
    output?: { stdout: string };
    errorText?: string;
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (ToolPart | TextPart)[];
  }

  const QUESTION = "Which package managers are installed?";
  const ANSWER = "Node 24 and npm 11 are installed. pnpm is not.";

  // The commands the agent runs, in order, with their result.
  const SCRIPT: ({ command: string; stdout: string } | { command: string; error: string })[] = [
    { command: "node --version", stdout: "v24.18.0" },
    { command: "npm --version", stdout: "11.6.2" },
    { command: "pnpm --version", error: "command not found: pnpm" },
  ];

  function finish(part: ToolPart, step: (typeof SCRIPT)[number]) {
    if ("error" in step) {
      part.state = "output-error";
      part.errorText = step.error;
    } else {
      part.state = "output-available";
      part.output = { stdout: step.stdout };
    }
    return part;
  }

  function transcript(): ChatMessage[] {
    return [
      { id: "user-0", role: "user", parts: [{ type: "text", text: QUESTION }] },
      {
        id: "assistant-0",
        role: "assistant",
        parts: [
          ...SCRIPT.map((step, index) =>
            finish(
              {
                type: "tool-runCommand",
                toolCallId: `call-0-${index}`,
                state: "input-available",
                input: { command: step.command },
              },
              step
            )
          ),
          { type: "text", text: ANSWER },
        ],
      },
    ];
  }

  const messages = ref<ChatMessage[]>(transcript());
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const busy = computed(() => status.value !== "ready");

  // The finished transcript starts with the failed call open.
  const initial = ref(true);

  // Unmounting bumps `run`, so a running script stops at its next wait.
  let run = 0;
  tryOnScopeDispose(() => run++);

  async function sleep(ms: number) {
    const id = run;
    await promiseTimeout(ms);
    return id === run;
  }

  async function streamInto(target: { text: string }, text: string, delayMs: number) {
    for (const chunk of text.match(/\S+\s*/g) ?? []) {
      target.text += chunk;
      if (!(await sleep(delayMs))) return false;
    }
    return true;
  }

  function getText(message: ChatMessage) {
    return message.parts
      .filter((part): part is TextPart => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  function getTools(message: ChatMessage) {
    return message.parts.filter((part): part is ToolPart => part.type === "tool-runCommand");
  }

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }

  async function replay() {
    const id = ++run;
    initial.value = false;
    messages.value = [
      { id: `user-${id}`, role: "user", parts: [{ type: "text", text: QUESTION }] },
    ];
    status.value = "submitted";
    if (!(await sleep(300))) return;

    const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    for (const [index, step] of SCRIPT.entries()) {
      const part = reactive<ToolPart>({
        type: "tool-runCommand",
        toolCallId: `call-${id}-${index}`,
        state: "input-available",
        input: { command: step.command },
      });
      message.parts.push(part);
      if (!(await sleep(900))) return;
      finish(part, step);
    }

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;
    status.value = "ready";
  }
</script>
