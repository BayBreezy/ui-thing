---
title: Checkpoint
description: Marks a point in the conversation you can return to.
label: New
---

::prose-show-case

:DocsAiCheckpoint

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Checkpoint/DocsAiCheckpoint.vue" code lang="vue" -->

```vue [DocsAiCheckpoint.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="(message, index) in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ message.text }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent>
          <p>{{ message.text }}</p>
        </UiMessageContent>
      </UiMessage>
      <UiMarker v-if="message.checkpoint" variant="separator">
        <UiMarkerContent class="inline-flex items-center gap-2">
          {{ message.checkpoint.label }}
          <UiButton
            v-if="index < messages.length - 1"
            size="xs"
            variant="outline"
            :aria-label="`Restore to ${message.checkpoint.label}`"
            @click="restore(message.id)"
          >
            Restore
          </UiButton>
        </UiMarkerContent>
      </UiMarker>
    </template>
    <UiButton
      v-if="!busy && nextMessage"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="sendMessage(nextMessage)"
    >
      Continue
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    text: string;
    checkpoint?: { label: string };
  }

  // The scripted conversation. A checkpoint is data on the agent's turn.
  const transcript: ChatMessage[] = [
    {
      id: "m1",
      role: "user",
      text: "Rename the button component to action.",
    },
    {
      id: "m2",
      role: "assistant",
      text: "Renamed Button to Action in components/ui/button/Button.vue.",
      checkpoint: { label: "Button renamed" },
    },
    {
      id: "m3",
      role: "user",
      text: "Update the docs to match.",
    },
    {
      id: "m4",
      role: "assistant",
      text: "Updated the Button page to say Action.",
    },
  ];

  const messages = ref<ChatMessage[]>(transcript.map((message) => ({ ...message })));

  // Stream the scripted reply a few characters at a time.
  let reply: ChatMessage | undefined;
  let cursor = 0;
  const {
    isActive: busy,
    pause,
    resume,
  } = useIntervalFn(
    () => {
      if (!reply) return;

      cursor = Math.min(reply.text.length, cursor + 3);
      const last = messages.value.at(-1);
      if (last?.id === reply.id) last.text = reply.text.slice(0, cursor);

      if (cursor >= reply.text.length) pause();
    },
    20,
    { immediate: false }
  );

  // The next scripted message the person can send.
  const nextMessage = computed(() => {
    const message = transcript[messages.value.length];
    return message?.role === "user" ? message : undefined;
  });

  function restore(messageId: string) {
    const index = messages.value.findIndex((message) => message.id === messageId);

    if (index === -1) return;

    messages.value = messages.value.slice(0, index + 1);
  }

  function sendMessage(message: ChatMessage) {
    const next = transcript[messages.value.length + 1];
    messages.value = [...messages.value, { ...message }];

    if (!next || next.role !== "assistant") return;

    messages.value = [...messages.value, { ...next, text: "" }];
    reply = next;
    cursor = 0;
    resume();
  }
</script>
```

<!-- /automd -->

::

Checkpoint is a point in the conversation you can return to. It is a [Marker](/components/marker) after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Installation

Checkpoint is built with the [Marker](/components/marker) and [Button](/components/button) components.

:prose-pm-x{command="ui-thing@latest add marker button"}

## Usage

Render a marker after the turn, with a button that restores it.

```vue
<template>
  <UiMarker variant="separator">
    <UiMarkerContent class="inline-flex items-center gap-2">
      {{ label }}
      <UiButton size="xs" variant="outline" @click="restore"> Restore </UiButton>
    </UiMarkerContent>
  </UiMarker>
</template>
```

See [Marker](/components/marker#separator).

## AI SDK

Restore replaces the thread with the messages up to and including that turn. Every later turn is removed. Send a new message to continue from there.

```ts
const index = chat.messages.findIndex((message) => message.id === messageId);
chat.messages = chat.messages.slice(0, index + 1);
```

Stream the checkpoint as a data part on the agent's turn. Send the same `id` again only when you mean to update that checkpoint.

```ts
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({
      type: "data-checkpoint",
      id: "rename",
      data: { label: "Button renamed" },
    });
  },
});
```

```ts
const checkpoint = message.parts.find((part) => part.type === "data-checkpoint");
```

