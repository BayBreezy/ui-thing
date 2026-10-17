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
          <template v-for="(part, index) in message.parts" :key="index">
            <p v-if="part.type === 'text'">
              {{ part.text }}
            </p>
            <UiTrace v-else-if="part.state !== 'output-available'">
              <UiTraceLine :status="isStreaming(message) ? 'running' : 'error'">
                <UiTraceIcon>
                  <Icon name="lucide:file-text" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{ isStreaming(message) ? "Reading" : "Failed to read" }} {{ part.input.path }}
                </UiTraceTitle>
              </UiTraceLine>
            </UiTrace>
            <UiTrace v-else-if="part.output">
              <UiSheet>
                <UiSheetTrigger>
                  <UiTraceLine>
                    <UiTraceIcon>
                      <Icon name="lucide:file-text" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>Read {{ part.output.path }}</UiTraceTitle>
                    <UiTraceIcon>
                      <Icon name="lucide:chevron-right" class="size-4" />
                    </UiTraceIcon>
                  </UiTraceLine>
                </UiSheetTrigger>
                <UiSheetContent>
                  <UiSheetHeader>
                    <UiSheetTitle class="font-mono">
                      {{ part.output.path }}
                    </UiSheetTitle>
                    <UiSheetDescription>
                      {{ part.output.content.split("\n").length }} lines
                    </UiSheetDescription>
                  </UiSheetHeader>
                  <UiCodeBlock class="mx-6 mb-6 w-auto">
                    <UiCodeBlockContent line-numbers>
                      {{ part.output.content }}
                    </UiCodeBlockContent>
                  </UiCodeBlock>
                </UiSheetContent>
              </UiSheet>
            </UiTrace>
          </template>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="messages.length === 0 ? send() : reset()"
    >
      {{ messages.length === 0 ? "Send message" : "Reset" }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface ToolPart {
    type: "tool-readFile";
    toolCallId: string;
    state: "input-available" | "output-available";
    input: { path: string };
    output?: { path: string; content: string };
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

  const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/vue": "^4.0.0",
    "ai": "^7.0.0",
    "nuxt": "^4.2.0"
  }
}`;

  const QUESTION = "Which AI SDK version does this app use?";
  const ANSWER = "It uses ai 7 with @ai-sdk/vue 4.";

  const messages = ref<ChatMessage[]>([]);
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const busy = computed(() => status.value !== "ready");

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

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }

  async function send() {
    messages.value = [{ id: "user", role: "user", parts: [{ type: "text", text: QUESTION }] }];
    status.value = "submitted";
    if (!(await sleep(300))) return;

    const message = reactive<ChatMessage>({ id: "assistant", role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    const part = reactive<ToolPart>({
      type: "tool-readFile",
      toolCallId: "call-readFile",
      state: "input-available",
      input: { path: "package.json" },
    });
    message.parts.push(part);
    if (!(await sleep(900))) return;
    part.output = { path: "package.json", content: PACKAGE_JSON };
    part.state = "output-available";

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;
    status.value = "ready";
  }

  function reset() {
    messages.value = [];
  }
</script>
