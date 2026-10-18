<template>
  <!--
    Simple message composer
    Features: Rounded input with a send button, enter to send, disabled send while empty, sent messages shown above as bubbles and a polite live region for screen readers
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto flex max-w-lg flex-col gap-6">
      <div class="flex min-h-28 flex-col justify-end gap-2" aria-live="polite">
        <UiMessage v-for="message in sent" :key="message.id" align="end">
          <UiMessageContent>
            <UiBubble>
              <UiBubbleContent>{{ message.text }}</UiBubbleContent>
            </UiBubble>
          </UiMessageContent>
        </UiMessage>
        <p v-if="!sent.length" class="text-muted-foreground text-center text-sm">
          Say something to get started.
        </p>
      </div>

      <form
        class="bg-background flex items-center gap-2 rounded-full border p-1.5 pl-4 shadow-xs"
        @submit.prevent="send"
      >
        <UiLabel for="composer1" class="sr-only">Message</UiLabel>
        <input
          id="composer1"
          v-model="draft"
          type="text"
          placeholder="Write a message"
          autocomplete="off"
          class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <UiButton
          type="submit"
          size="icon"
          class="rounded-full"
          :disabled="!draft.trim()"
          aria-label="Send message"
        >
          <Icon name="lucide:arrow-up" class="size-4" />
        </UiButton>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const draft = ref("");
  const sent = ref<{ id: number; text: string }[]>([]);

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    sent.value.push({ id: sent.value.length, text });
    sent.value = sent.value.slice(-3);
    draft.value = "";
  }
</script>
