---
title: Chat
description: The thread. Message Scroller keeps your place while the reply streams.
label: New
---

::prose-show-case

:DocsAiChat

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Chat/DocsAiChat.vue" code lang="vue" -->

```vue [DocsAiChat.vue]
<template>
  <DefineReasoningRow v-slot="{ id, text: reasoning, running }">
    <UiTraceCollapsible
      :open="reasoningOpen[id] ?? running"
      @update:open="reasoningOpen[id] = $event"
    >
      <UiTraceCollapsibleTrigger>
        <UiTraceLine :status="running ? 'running' : undefined">
          <UiTraceIcon>
            <Icon v-if="running" name="lucide:loader-circle" class="size-4 animate-spin" />
            <Icon v-else name="lucide:circle-check" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>{{ running ? "Thinking" : "Thought" }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="whitespace-pre-wrap">
        {{ reasoning }}
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </DefineReasoningRow>

  <DefineToolRow v-slot="{ part, streaming }">
    <UiTraceCollapsible v-if="part.state === 'output-available' || part.state === 'output-error'">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>
            {{ part.state === "output-error" ? "Failed to run" : "Ran" }} {{ part.input.command }}
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
    <UiTraceLine v-else :status="streaming ? 'running' : 'error'">
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>
        {{ streaming ? "Running" : "Failed to run" }} {{ part.input.command }}
      </UiTraceTitle>
    </UiTraceLine>
  </DefineToolRow>

  <UiMessageScrollerProvider>
    <div class="relative flex w-full flex-col gap-4">
      <div class="mx-auto flex h-200 w-full max-w-2xl flex-col gap-4">
        <div class="flex items-start justify-between gap-4 p-8 pb-4">
          <div class="flex flex-col gap-1">
            <div class="font-medium">New Thread</div>
            <div class="text-muted-foreground text-sm">Ask the agent to change your code.</div>
          </div>
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="outline"
                size="icon"
                aria-label="Reset conversation"
                :disabled="busy"
                @click="reset"
              >
                <Icon name="lucide:rotate-cw" class="size-4" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent>
              <p>Reset</p>
            </UiTooltipContent>
          </UiTooltip>
        </div>
        <div class="min-h-0 flex-1">
          <UiEmpty v-if="messages.length === 0" class="h-full">
            <UiEmptyHeader>
              <UiEmptyMedia variant="icon">
                <Icon name="lucide:message-circle-dashed" class="size-4" />
              </UiEmptyMedia>
              <UiEmptyTitle>What should we build?</UiEmptyTitle>
              <UiEmptyDescription>
                The agent can read your code, run commands and make changes. Press send to start.
              </UiEmptyDescription>
            </UiEmptyHeader>
          </UiEmpty>
          <UiMessageScroller v-else>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent :aria-busy="busy" class="gap-6 px-8 py-0">
                <template v-for="message in messages" :key="message.id">
                  <UiMessageScrollerItem
                    v-if="message.role === 'user'"
                    :message-id="message.id"
                    scroll-anchor
                    class="ms-anim-slide-up"
                  >
                    <UiMessage align="end">
                      <UiMessageContent>
                        <UiBubble align="end" variant="muted">
                          <UiBubbleContent>{{ getMessageText(message) }}</UiBubbleContent>
                        </UiBubble>
                      </UiMessageContent>
                    </UiMessage>
                  </UiMessageScrollerItem>
                  <UiMessageScrollerItem v-else :message-id="message.id">
                    <UiMessage>
                      <UiMessageContent class="gap-3">
                        <UiTrace v-if="getSteps(message).length > 0">
                          <template v-for="(part, index) in getSteps(message)" :key="index">
                            <ReasoningRow
                              v-if="part.type === 'reasoning'"
                              :id="`${message.id}-${index}`"
                              :text="part.text"
                              :running="part.state === 'streaming'"
                            />
                            <ToolRow
                              v-else
                              :part="part"
                              :streaming="busy && message === messages.at(-1)"
                            />
                          </template>
                        </UiTrace>
                        <DocsAiMarkdown
                          v-if="getMessageText(message)"
                          :value="getMessageText(message)"
                          :streaming="busy && message === messages.at(-1)"
                        />
                      </UiMessageContent>
                    </UiMessage>
                  </UiMessageScrollerItem>
                </template>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </div>
        <div class="p-8 pt-0">
          <form ref="formRef" class="w-full" @submit.prevent="onSubmit">
            <UiInputGroup>
              <UiInputGroupTextarea
                v-model="text"
                placeholder="Ask the agent..."
                aria-label="Message"
                class="min-h-14"
                @keydown="onKeydown"
              />
              <UiInputGroupAddon align="block-end" class="pt-1">
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiInputGroupButton
                      aria-label="Add context"
                      type="button"
                      size="icon-sm"
                      variant="outline"
                    >
                      <Icon name="lucide:plus" class="size-4" />
                    </UiInputGroupButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="start" side="top" class="w-44">
                    <UiDropdownMenuItem>
                      <Icon name="lucide:paperclip" class="size-4" />
                      Add Photos &amp; Files
                    </UiDropdownMenuItem>
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem>
                      <Icon name="lucide:telescope" class="size-4" />
                      Deep Research
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                      <Icon name="lucide:globe" class="size-4" />
                      Web Search
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
                <UiInputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  :disabled="!canSend"
                  class="ml-auto"
                >
                  <Icon name="lucide:arrow-up" class="size-4" />
                  <span class="sr-only">Send</span>
                </UiInputGroupButton>
              </UiInputGroupAddon>
            </UiInputGroup>
          </form>
        </div>
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  // The parts of an agent turn, shaped like AI SDK UI message parts.
  type ChatPart =
    | { type: "reasoning"; text: string; state: "streaming" | "done" }
    | {
        type: "tool-runCommand";
        state: "input-available" | "output-available" | "output-error";
        input: { command: string };
        output?: { stdout: string };
        errorText?: string;
      }
    | { type: "text"; text: string };

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: ChatPart[];
  }

  // A scripted agent turn. Each step streams into the message in order.
  type Step =
    | { type: "reasoning"; text: string }
    | { type: "sleep"; ms: number }
    | { type: "tool"; command: string; ms: number; stdout: string }
    | { type: "text"; text: string };

  const script: { user: string; steps: Step[] }[] = [
    {
      user: "Add a dark mode toggle to the settings page.",
      steps: [
        {
          type: "reasoning",
          text: "I need to know how themes are set up before I add a toggle. If @nuxtjs/color-mode is already installed, the toggle only has to set colorMode.preference.",
        },
        { type: "sleep", ms: 400 },
        {
          type: "tool",
          command: "rg -l colorMode nuxt.config.ts app",
          ms: 800,
          stdout: "nuxt.config.ts",
        },
        { type: "sleep", ms: 500 },
        {
          type: "text",
          text: `@nuxtjs/color-mode is already set up in \`nuxt.config.ts\`, so the toggle only has to set \`colorMode.preference\`.

**Changes**

- Added \`components/ModeToggle.vue\` with a Light and Dark option.
- Put \`<ModeToggle />\` next to the Appearance heading in \`pages/settings.vue\`.

\`\`\`ts
const colorMode = useColorMode()
\`\`\`
`,
        },
      ],
    },
    {
      user: "Make it follow the system setting by default.",
      steps: [
        {
          type: "reasoning",
          text: "The default theme lives in the colorMode options. I should check what it is set to now.",
        },
        { type: "sleep", ms: 400 },
        {
          type: "tool",
          command: "rg -n preference nuxt.config.ts",
          ms: 800,
          stdout: "12:    preference: 'light',",
        },
        { type: "sleep", ms: 500 },
        {
          type: "text",
          text: `It was set to \`light\`. I updated the \`colorMode\` options in \`nuxt.config.ts\`:

\`\`\`ts
colorMode: { classSuffix: '', preference: 'system' },
\`\`\`

New visitors now get the theme from their OS. The toggle also has a **System** option, so anyone who picked Light or Dark can switch back.
`,
        },
      ],
    },
    {
      user: "Run the build before I ship it.",
      steps: [
        {
          type: "tool",
          command: "pnpm build",
          ms: 1600,
          stdout:
            "Nuxt 4.0.0 with Nitro 2.12.0\n\n✓ Client built in 4.2s\n✓ Server built in 1.8s\n✓ Prerendered 12 routes",
        },
        { type: "sleep", ms: 500 },
        {
          type: "text",
          text: `The build passes, so it is ready to ship.

- Built the client in **4.2s**.
- No build or type errors.
- Prerendered all **12** routes.
`,
        },
      ],
    },
  ];

  const fallback = "This demo only knows the scripted turns. Press reset to start over.";

  const messages = ref<ChatMessage[]>([]);
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const draft = ref<string | null>(null);
  const formRef = ref<HTMLFormElement | null>(null);
  // Open state of each reasoning row, set once the person toggles it.
  const reasoningOpen = reactive<Record<string, boolean | undefined>>({});

  const busy = computed(() => status.value !== "ready");
  const sentCount = computed(
    () => messages.value.filter((message) => message.role === "user").length
  );
  const nextMessage = computed(() => script[sentCount.value]?.user ?? null);
  const text = computed({
    get: () => draft.value ?? nextMessage.value ?? "",
    set: (value: string) => {
      draft.value = value;
    },
  });
  const canSend = computed(() => text.value.trim().length > 0 && !busy.value);

  // Simulated streaming. Reset and unmount bump `run`, so a running script
  // stops at its next wait.
  let run = 0;
  tryOnScopeDispose(() => run++);

  async function sleep(ms: number, id: number) {
    await promiseTimeout(ms);
    return id === run;
  }

  async function stream(value: string, write: (text: string) => void, id: number) {
    for (let cursor = 0; cursor < value.length;) {
      cursor = Math.min(value.length, cursor + 3);
      write(value.slice(0, cursor));
      if (!(await sleep(16, id))) return false;
    }
    return true;
  }

  async function respond(steps: Step[]) {
    const id = run;
    status.value = "submitted";
    if (!(await sleep(600, id))) return;

    messages.value.push({ id: `assistant-${Date.now()}`, role: "assistant", parts: [] });
    const message = messages.value.at(-1)!;
    status.value = "streaming";

    for (const step of steps) {
      if (step.type === "sleep") {
        if (!(await sleep(step.ms, id))) return;
      } else if (step.type === "reasoning") {
        message.parts.push({ type: "reasoning", text: "", state: "streaming" });
        const part = message.parts.at(-1) as Extract<ChatPart, { type: "reasoning" }>;
        if (
          !(await stream(
            step.text,
            (value) => {
              part.text = value;
            },
            id
          ))
        ) {
          return;
        }
        part.state = "done";
      } else if (step.type === "tool") {
        message.parts.push({
          type: "tool-runCommand",
          state: "input-available",
          input: { command: step.command },
        });
        const part = message.parts.at(-1) as Extract<ChatPart, { type: "tool-runCommand" }>;
        if (!(await sleep(step.ms, id))) return;
        part.output = { stdout: step.stdout };
        part.state = "output-available";
      } else {
        message.parts.push({ type: "text", text: "" });
        const part = message.parts.at(-1) as Extract<ChatPart, { type: "text" }>;
        if (
          !(await stream(
            step.text,
            (value) => {
              part.text = value;
            },
            id
          ))
        ) {
          return;
        }
      }
    }

    status.value = "ready";
  }

  function onSubmit() {
    if (!canSend.value) return;

    const turn = draft.value === null ? script[sentCount.value] : undefined;
    messages.value.push({
      id: `user-${Date.now()}`,
      role: "user",
      parts: [{ type: "text", text: text.value.trim() }],
    });
    draft.value = null;
    respond(turn?.steps ?? [{ type: "text", text: fallback }]);
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.value?.requestSubmit();
    }
  }

  function reset() {
    run++;
    messages.value = [];
    draft.value = null;
    status.value = "ready";
    Object.keys(reasoningOpen).forEach((key) => Reflect.deleteProperty(reasoningOpen, key));
  }

  function getMessageText(message: ChatMessage) {
    return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
  }

  type ToolPart = Extract<ChatPart, { type: "tool-runCommand" }>;

  const [DefineReasoningRow, ReasoningRow] = createReusableTemplate<{
    id: string;
    text: string;
    running: boolean;
  }>();
  const [DefineToolRow, ToolRow] = createReusableTemplate<{
    part: ToolPart;
    streaming: boolean;
  }>();

  function getSteps(message: ChatMessage) {
    return message.parts.filter(
      (part) => part.type === "reasoning" || part.type === "tool-runCommand"
    ) as Exclude<ChatPart, { type: "text" }>[];
  }
</script>
```

<!-- /automd -->

::

Chat is the thread of a conversation with the agent. Each turn is a [Message](/ai-elements/message) inside [Message Scroller](/components/message-scroller). The person's message is the scroll anchor, so a new question settles near the top and the reply streams in under it. The field is a [Prompt Input](/ai-elements/prompt-input).

## Installation

Chat is built with the [Message Scroller](/components/message-scroller), [Message](/components/message), [Bubble](/components/bubble), and [Input Group](/components/input-group) components.

:prose-pm-x{command="ui-thing@latest add message-scroller message bubble input-group"}

## Usage

```vue
<template>
  <UiMessageScrollerProvider auto-scroll>
    <UiMessageScroller>
      <UiMessageScrollerViewport>
        <UiMessageScrollerContent>
          <UiMessageScrollerItem :message-id="id" scroll-anchor>
            <UiMessage align="end">
              <UiMessageContent>
                <UiBubble align="end" variant="muted">
                  <UiBubbleContent>{{ text }}</UiBubbleContent>
                </UiBubble>
              </UiMessageContent>
            </UiMessage>
          </UiMessageScrollerItem>
        </UiMessageScrollerContent>
      </UiMessageScrollerViewport>
      <UiMessageScrollerButton />
    </UiMessageScroller>
  </UiMessageScrollerProvider>
</template>
```

`scroll-anchor` goes on the person's turn. `auto-scroll` follows the reply while the person stays at the live edge.

See [Message Scroller](/components/message-scroller).

## AI SDK

Render `chat.messages` from the [AI SDK](https://ai-sdk.dev/docs/getting-started/nuxt) `Chat` class. Each message is a `UiMessageScrollerItem` keyed by its `id`, and the person's messages are the scroll anchors.

```vue
<template>
  <UiMessageScrollerProvider auto-scroll>
    <UiMessageScroller>
      <UiMessageScrollerViewport>
        <UiMessageScrollerContent :aria-busy="chat.status === 'streaming'">
          <UiMessageScrollerItem
            v-for="message in chat.messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.role === 'user'"
          >
            <!-- Render the message -->
          </UiMessageScrollerItem>
        </UiMessageScrollerContent>
      </UiMessageScrollerViewport>
      <UiMessageScrollerButton />
    </UiMessageScroller>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  import { Chat } from "@ai-sdk/vue";

  const chat = new Chat({});
</script>
```

## Markdown

The agent's reply streams as markdown. Render it with [Comark](https://comark.dev) (`@comark/vue`) and route fenced code to a [Code Block](/components/code-block#markdown) with a custom `pre` component, the same way as in [Message](/ai-elements/message#markdown). Pass `streaming` only to the reply that is still streaming.

```vue
<template>
  <UiMessage>
    <UiMessageContent>
      <Markdown
        class="typeset"
        :value="getText(message)"
        :components="{ pre: MarkdownCodeBlock }"
        :streaming="chat.status === 'streaming' && message === chat.messages.at(-1)"
      />
    </UiMessageContent>
  </UiMessage>
</template>

<script lang="ts" setup>
  import { Markdown } from "@comark/vue";

  import MarkdownCodeBlock from "./MarkdownCodeBlock.vue";
</script>
```

