<template>
  <DefineThinkingLine v-slot="{ running }">
    <UiTraceLine :status="running ? 'running' : undefined">
      <UiTraceIcon>
        <Icon v-if="running" name="lucide:loader-circle" class="size-4 animate-spin" />
        <Icon v-else name="lucide:circle-check" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>
        {{ running ? "Thinking" : "Thought for 5s" }}
      </UiTraceTitle>
    </UiTraceLine>
  </DefineThinkingLine>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ getMessageText(message) }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent class="gap-4">
          <UiTrace v-if="getRows(message).length + getSources(message).length > 0">
            <template
              v-for="(part, index) in getRows(message)"
              :key="part.type === 'tool-runCommand' ? part.toolCallId : index"
            >
              <!-- Thinking row -->
              <template v-if="part.type === 'reasoning'">
                <ThinkingLine
                  v-if="part.text.length === 0"
                  :running="isStreaming(message) && part.state === 'streaming'"
                />
                <UiTraceCollapsible
                  v-else
                  :open="
                    open[`${message.id}-${index}`] ??
                    (isStreaming(message) && part.state === 'streaming')
                  "
                  @update:open="open[`${message.id}-${index}`] = $event"
                >
                  <UiTraceCollapsibleTrigger>
                    <ThinkingLine :running="isStreaming(message) && part.state === 'streaming'" />
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent class="whitespace-pre-wrap">
                    {{ part.text }}
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
              </template>

              <!-- Tool row -->
              <template v-else-if="part.type === 'tool-runCommand'">
                <UiTraceCollapsible
                  v-if="part.state === 'output-available' || part.state === 'output-error'"
                  :default-open="index === 2"
                >
                  <UiTraceCollapsibleTrigger>
                    <UiTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                      <UiTraceIcon>
                        <Icon
                          v-if="part.state === 'output-error'"
                          name="lucide:circle-alert"
                          class="size-4"
                        />
                        <Icon v-else name="lucide:circle-check" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>
                        {{ part.state === "output-error" ? "Failed to run" : "Ran" }}
                        {{ part.input.command }}
                      </UiTraceTitle>
                    </UiTraceLine>
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent>
                    <UiCodeBlock
                      v-if="part.state === 'output-error'"
                      size="sm"
                      variant="destructive"
                    >
                      <UiCodeBlockContent wrap class="max-h-64">
                        {{ part.errorText }}
                      </UiCodeBlockContent>
                    </UiCodeBlock>
                    <UiCodeBlock v-else size="sm">
                      <UiCodeBlockContent wrap class="max-h-64">
                        {{ part.output?.stdout }}
                      </UiCodeBlockContent>
                    </UiCodeBlock>
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
                <UiTraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                  <UiTraceIcon>
                    <Icon
                      v-if="isStreaming(message)"
                      name="lucide:loader-circle"
                      class="size-4 animate-spin"
                    />
                    <Icon v-else name="lucide:circle-alert" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>
                    {{ isStreaming(message) ? "Running" : "Failed to run" }}
                    {{ part.input.command }}
                  </UiTraceTitle>
                </UiTraceLine>
              </template>
            </template>

            <!-- Sources row -->
            <UiTraceCollapsible v-if="getSources(message).length > 0">
              <UiTraceCollapsibleTrigger>
                <UiTraceLine
                  :status="
                    isStreaming(message) && getMessageText(message).length === 0
                      ? 'running'
                      : undefined
                  "
                >
                  <UiTraceIcon>
                    <Icon
                      v-if="isStreaming(message) && getMessageText(message).length === 0"
                      name="lucide:loader-circle"
                      class="size-4 animate-spin"
                    />
                    <Icon v-else name="lucide:globe" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>
                    {{
                      isStreaming(message) && getMessageText(message).length === 0
                        ? "Using"
                        : "Used"
                    }}
                    {{ getSources(message).length }} sources
                  </UiTraceTitle>
                </UiTraceLine>
              </UiTraceCollapsibleTrigger>
              <UiTraceCollapsibleContent>
                <UiTrace>
                  <a
                    v-for="source in getSources(message)"
                    :key="source.url"
                    :href="source.url"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <UiTraceLine>
                      <UiTraceIcon>
                        <Icon name="lucide:globe" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>
                        {{ source.title ?? getHostname(source.url) }}
                        <span class="sr-only"> (opens in a new tab)</span>
                      </UiTraceTitle>
                      <UiTraceIcon>
                        <Icon name="lucide:arrow-up-right" class="size-4" />
                      </UiTraceIcon>
                    </UiTraceLine>
                  </a>
                </UiTrace>
              </UiTraceCollapsibleContent>
            </UiTraceCollapsible>
          </UiTrace>
          <p v-if="getMessageText(message)">
            {{ getMessageText(message) }}
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

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ReasoningPart {
    type: "reasoning";
    text: string;
    state: "streaming" | "done";
  }

  interface ToolPart {
    type: "tool-runCommand";
    toolCallId: string;
    input: { command: string };
    state: "input-available" | "output-available" | "output-error";
    output?: { stdout: string };
    errorText?: string;
  }

  interface SourcePart {
    type: "source-url";
    url: string;
    title?: string;
  }

  type Part = TextPart | ReasoningPart | ToolPart | SourcePart;

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: Part[];
  }

  const question = "Why does pnpm install fail in CI?";
  const reasoning =
    "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.";
  const tools = [
    { command: "pnpm --version", delayMs: 700, stdout: "10.18.0" },
    {
      command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
      delayMs: 900,
      stdout: " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
    },
    {
      command: "pnpm install --frozen-lockfile",
      delayMs: 1200,
      error:
        'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json',
    },
  ];
  const sources = [
    {
      url: "https://pnpm.io/cli/install#--frozen-lockfile",
      title: "pnpm install | pnpm.io",
    },
    {
      url: "https://pnpm.io/continuous-integration",
      title: "Continuous Integration | pnpm.io",
    },
  ];
  const answer =
    "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile.";

  // The finished conversation, shown before the first replay.
  const transcript: ChatMessage[] = [
    { id: "user-0", role: "user", parts: [{ type: "text", text: question }] },
    {
      id: "assistant-0",
      role: "assistant",
      parts: [
        { type: "reasoning", text: reasoning, state: "done" },
        ...tools.map((tool, index): ToolPart => ({
          type: "tool-runCommand",
          toolCallId: `call-0-${index}`,
          input: { command: tool.command },
          ...(tool.error
            ? { state: "output-error" as const, errorText: tool.error }
            : { state: "output-available" as const, output: { stdout: tool.stdout! } }),
        })),
        ...sources.map((source): SourcePart => ({ type: "source-url", ...source })),
        { type: "text", text: answer },
      ],
    },
  ];

  const messages = ref<ChatMessage[]>(transcript);
  const status = ref<"ready" | "streaming">("ready");
  const open = ref<Record<string, boolean | undefined>>({});

  const [DefineThinkingLine, ThinkingLine] = createReusableTemplate<{ running: boolean }>();

  const busy = computed(() => status.value === "streaming");

  // Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
  let runId = 0;

  // Invalidate the running script on unmount so pending steps bail out.
  tryOnScopeDispose(() => {
    runId++;
  });

  async function stream(part: TextPart | ReasoningPart, text: string, delayMs: number, id: number) {
    for (const chunk of text.split(/(?<= )/)) {
      await promiseTimeout(delayMs);
      if (id !== runId) return false;
      part.text += chunk;
    }
    return true;
  }

  async function replay() {
    const id = ++runId;
    open.value = {};
    messages.value = [
      { id: `user-${id}`, role: "user", parts: [{ type: "text", text: question }] },
      { id: `assistant-${id}`, role: "assistant", parts: [] },
    ];
    const message = messages.value.at(-1)!;
    status.value = "streaming";

    message.parts.push({ type: "reasoning", text: "", state: "streaming" });
    const thinking = message.parts.at(-1) as ReasoningPart;
    if (!(await stream(thinking, reasoning, 40, id))) return;
    thinking.state = "done";

    for (const [index, tool] of tools.entries()) {
      message.parts.push({
        type: "tool-runCommand",
        toolCallId: `call-${id}-${index}`,
        input: { command: tool.command },
        state: "input-available",
      });
      const part = message.parts.at(-1) as ToolPart;
      await promiseTimeout(tool.delayMs);
      if (id !== runId) return;
      if (tool.error) {
        part.state = "output-error";
        part.errorText = tool.error;
      } else {
        part.state = "output-available";
        part.output = { stdout: tool.stdout! };
      }
    }

    for (const source of sources) message.parts.push({ type: "source-url", ...source });

    await promiseTimeout(1000);
    if (id !== runId) return;

    message.parts.push({ type: "text", text: "" });
    if (!(await stream(message.parts.at(-1) as TextPart, answer, 20, id))) return;

    status.value = "ready";
  }

  function getMessageText(message: ChatMessage) {
    return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
  }

  function getRows(message: ChatMessage) {
    return message.parts.filter(
      (part): part is ReasoningPart | ToolPart =>
        part.type === "reasoning" || part.type === "tool-runCommand"
    );
  }

  function getSources(message: ChatMessage) {
    return message.parts.filter((part): part is SourcePart => part.type === "source-url");
  }

  function getHostname(url: string) {
    return new URL(url).hostname;
  }

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }
</script>
