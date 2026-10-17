---
title: Reasoning
description: Displays the agent's thinking as it streams.
label: New
---

::prose-show-case

:DocsAiReasoning

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Reasoning/DocsAiReasoning.vue" code lang="vue" -->

```vue [DocsAiReasoning.vue]
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
          <UiTrace v-if="getReasoning(message).length > 0">
            <template v-for="(part, index) in getReasoning(message)" :key="index">
              <UiTraceLine
                v-if="part.text.length === 0"
                :status="isStreaming(message) && part.state === 'streaming' ? 'running' : undefined"
              >
                <UiTraceTitle>
                  {{
                    isStreaming(message) && part.state === "streaming"
                      ? "Thinking"
                      : "Thought for 5s"
                  }}
                </UiTraceTitle>
              </UiTraceLine>
              <UiTraceCollapsible
                v-else
                :open="
                  openState[`${message.id}-${index}`] ??
                  (isStreaming(message) && part.state === 'streaming')
                "
                @update:open="openState[`${message.id}-${index}`] = $event"
              >
                <UiTraceCollapsibleTrigger>
                  <UiTraceLine
                    :status="
                      isStreaming(message) && part.state === 'streaming' ? 'running' : undefined
                    "
                  >
                    <UiTraceTitle>
                      {{
                        isStreaming(message) && part.state === "streaming"
                          ? "Thinking"
                          : "Thought for 5s"
                      }}
                    </UiTraceTitle>
                  </UiTraceLine>
                </UiTraceCollapsibleTrigger>
                <UiTraceCollapsibleContent class="whitespace-pre-wrap">
                  {{ part.text }}
                </UiTraceCollapsibleContent>
              </UiTraceCollapsible>
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

  interface ReasoningPart {
    type: "reasoning";
    text: string;
    state: "streaming" | "done";
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (ReasoningPart | TextPart)[];
  }

  const QUESTION = "Why is the checkout deploy so slow?";
  const REASONING =
    "The deploy log has three phases. Install takes 38s and next build takes 52s, both normal for this repo.\n\nImage optimization takes 3m 50s. It reruns on every deploy because its cache key includes the commit hash, so the cache never hits.";
  const ANSWER =
    "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash, and the deploy should take under two minutes.";

  function transcript(): ChatMessage[] {
    return [
      { id: "user-0", role: "user", parts: [{ type: "text", text: QUESTION }] },
      {
        id: "assistant-0",
        role: "assistant",
        parts: [
          { type: "reasoning", text: REASONING, state: "done" },
          { type: "text", text: ANSWER },
        ],
      },
    ];
  }

  const messages = ref<ChatMessage[]>(transcript());
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const busy = computed(() => status.value !== "ready");

  // The open state each line was set to by the person. Until then, a line
  // follows `running`. The finished transcript starts with its lines open.
  const openState = ref<Record<string, boolean | undefined>>({ "assistant-0-0": true });

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

  function getReasoning(message: ChatMessage) {
    return message.parts.filter((part): part is ReasoningPart => part.type === "reasoning");
  }

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }

  async function replay() {
    const id = ++run;
    messages.value = [
      { id: `user-${id}`, role: "user", parts: [{ type: "text", text: QUESTION }] },
    ];
    openState.value = {};
    status.value = "submitted";
    if (!(await sleep(300))) return;

    const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    const reasoning = reactive<ReasoningPart>({ type: "reasoning", text: "", state: "streaming" });
    message.parts.push(reasoning);
    if (!(await streamInto(reasoning, REASONING, 40))) return;
    reasoning.state = "done";
    if (!(await sleep(400))) return;

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;
    status.value = "ready";
  }
</script>
```

<!-- /automd -->

::

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `UiTrace` with a `UiTraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/components/trace) component.

:prose-pm-x{command="ui-thing@latest add trace"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:circle-check" />
          </UiTraceIcon>
          <UiTraceTitle>Thought</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="whitespace-pre-wrap">
        {{ text }}
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `UiTraceDescription` after the title.

::prose-show-case

:DocsAiReasoningDuration

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Reasoning/DocsAiReasoningDuration.vue" code lang="vue" -->

```vue [DocsAiReasoningDuration.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:circle-check" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Thought</UiTraceTitle>
          <UiTraceDescription>12s</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="whitespace-pre-wrap">
        {{ text }}
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const text =
    "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.";
</script>
```

<!-- /automd -->

::

```vue
<template>
  <UiTraceLine>
    <UiTraceIcon>
      <CircleCheckIcon />
    </UiTraceIcon>
    <UiTraceTitle>Thought</UiTraceTitle>
    <UiTraceDescription>{{ seconds }}s</UiTraceDescription>
  </UiTraceLine>
</template>
```

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `UiTraceLine` and becomes a `UiTraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/components/trace#open-state).

```vue
<template>
  <UiTraceLine v-if="text.length === 0" :status="running ? 'running' : undefined">
    <UiTraceIcon>
      <UiIcon name="lucide:loader-circle" v-if="running" class="animate-spin" />
      <UiIcon name="lucide:circle-check" v-else />
    </UiTraceIcon>
    <UiTraceTitle>{{ running ? "Thinking" : "Thought" }}</UiTraceTitle>
  </UiTraceLine>
  <UiTraceCollapsible v-else :open="open ?? running" @update:open="open = $event">
    <UiTraceCollapsibleTrigger>
      <UiTraceLine :status="running ? 'running' : undefined">
        <UiTraceIcon>
          <UiIcon name="lucide:loader-circle" v-if="running" class="animate-spin" />
          <UiIcon name="lucide:circle-check" v-else />
        </UiTraceIcon>
        <UiTraceTitle>{{ running ? "Thinking" : "Thought" }}</UiTraceTitle>
      </UiTraceLine>
    </UiTraceCollapsibleTrigger>
    <UiTraceCollapsibleContent class="whitespace-pre-wrap">
      {{ text }}
    </UiTraceCollapsibleContent>
  </UiTraceCollapsible>
</template>

<script lang="ts" setup>
  defineProps<{
    text: string;
    running: boolean;
  }>();

  const open = ref<boolean>();
</script>
```

```vue
<template>
  <UiTrace>
    <ReasoningLine
      v-for="(part, index) in message.parts.filter((part) => part.type === 'reasoning')"
      :key="index"
      :text="part.text"
      :running="streaming && part.state === 'streaming'"
    />
  </UiTrace>
</template>
```

Some models send several reasoning parts in one message. Each one is a line in the same `UiTrace`.

## API Reference

See [Trace](/components/trace#api-reference).
