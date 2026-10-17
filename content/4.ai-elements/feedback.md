---
title: Feedback
description: Thumbs up and down on a reply, with a short follow-up when something went wrong.
label: New
---

::prose-show-case

:DocsAiFeedback

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Feedback/DocsAiFeedback.vue" code lang="vue" -->

```vue [DocsAiFeedback.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-3 py-6 text-sm">
    <UiMessage>
      <UiMessageContent class="gap-2">
        <p>
          Set <code>unmount-on-hide</code> to <code>false</code> on the parent
          <code>UiTraceCollapsible</code> and nested rows keep their open state.
        </p>

        <UiMessageFooter class="px-0">
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Good response"
            :aria-pressed="vote === 'up'"
            :disabled="sent"
            @click="choose('up')"
          >
            <Icon
              name="lucide:thumbs-up"
              class="size-4"
              :class="vote === 'up' ? 'fill-current' : undefined"
            />
          </UiButton>
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Bad response"
            :aria-pressed="vote === 'down'"
            :disabled="sent"
            @click="choose('down')"
          >
            <Icon
              name="lucide:thumbs-down"
              class="size-4"
              :class="vote === 'down' ? 'fill-current' : undefined"
            />
          </UiButton>
          <span v-if="sent" class="text-muted-foreground text-xs" role="status">
            Thanks for the feedback.
          </span>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>

    <!-- Ask why, only after a thumbs down -->
    <form
      v-if="vote === 'down' && !sent"
      class="bg-muted/50 flex flex-col gap-3 rounded-lg border p-3"
      @submit.prevent="submit"
    >
      <p class="font-medium">What went wrong?</p>
      <div class="flex flex-wrap gap-1.5">
        <UiButton
          v-for="reason in reasons"
          :key="reason"
          type="button"
          size="xs"
          :variant="selected.includes(reason) ? 'default' : 'outline'"
          :aria-pressed="selected.includes(reason)"
          @click="toggle(reason)"
        >
          {{ reason }}
        </UiButton>
      </div>
      <UiTextarea v-model="comment" placeholder="Tell us more (optional)" :rows="2" />
      <div class="flex justify-end gap-2">
        <UiButton type="button" variant="ghost" size="sm" @click="reset">Cancel</UiButton>
        <UiButton type="submit" size="sm">Send feedback</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const reasons = ["Incorrect", "Out of date", "Too long", "Didn't follow instructions"];

  const vote = ref<"up" | "down" | null>(null);
  const selected = ref<string[]>([]);
  const comment = ref("");
  const sent = ref(false);

  function choose(next: "up" | "down") {
    // Clicking the active vote again clears it
    vote.value = vote.value === next ? null : next;
    // A thumbs up is sent straight away. A thumbs down asks why first.
    sent.value = vote.value === "up";
  }

  function toggle(reason: string) {
    selected.value = selected.value.includes(reason)
      ? selected.value.filter((r) => r !== reason)
      : [...selected.value, reason];
  }

  function submit() {
    // Send `{ vote, reasons: selected, comment }` to your backend here
    sent.value = true;
  }

  function reset() {
    vote.value = null;
    selected.value = [];
    comment.value = "";
  }
</script>
```

<!-- /automd -->

::

Feedback lets the person rate a reply with one click. A thumbs up is sent straight away. A thumbs down asks what went wrong, with a few reasons to pick from and an optional note, so the answer is useful when you read it later.

## Installation

Feedback is built with the [Message](/components/message), [Button](/components/button) and [Textarea](/components/textarea) components.

:prose-pm-x{command="ui-thing@latest add message button textarea"}

## Usage

The code above is the whole pattern. Send `{ vote, reasons, comment }` to your backend where `submit` and `choose` update the state.

- Clicking the active vote again clears it.
- A thumbs down opens the follow-up. Cancel clears the vote.
- After sending, the buttons are disabled and a status message confirms it.

## Reasons

Keep the list short and written in the reader's words. Four to six chips is enough. Let more than one apply, and keep the note optional so nobody has to write to be heard.

## Accessibility

- Each vote is a button with `aria-pressed`, so its state is announced.
- The confirmation is a `role="status"` region, so it is announced without moving focus.
- The reason chips are toggle buttons with `aria-pressed`.
