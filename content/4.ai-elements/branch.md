---
title: Branch
description: Step between the versions of a reply when the person regenerates it.
label: New
---

::prose-show-case

:DocsAiBranch

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Branch/DocsAiBranch.vue" code lang="vue" -->

```vue [DocsAiBranch.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-6 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>Give me a tagline for a Vue component library.</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>

    <UiMessage>
      <UiMessageContent class="gap-2">
        <p v-if="generating" class="shimmer text-muted-foreground">Writing another version…</p>
        <p v-else :key="index">{{ branches[index] }}</p>

        <UiMessageFooter class="px-0">
          <div class="flex items-center">
            <UiButton
              variant="ghost"
              size="icon-sm"
              aria-label="Previous response"
              :disabled="generating || index === 0"
              @click="index--"
            >
              <Icon name="lucide:chevron-left" class="size-4" />
            </UiButton>
            <span
              class="text-muted-foreground min-w-12 text-center text-xs tabular-nums"
              aria-live="polite"
            >
              {{ index + 1 }} / {{ branches.length }}
            </span>
            <UiButton
              variant="ghost"
              size="icon-sm"
              aria-label="Next response"
              :disabled="generating || index === branches.length - 1"
              @click="index++"
            >
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiButton>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Regenerate response"
            :disabled="generating"
            @click="regenerate"
          >
            <Icon
              name="lucide:refresh-ccw"
              class="size-4"
              :class="generating ? 'animate-spin' : undefined"
            />
          </UiButton>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  // Every time the reply is regenerated, the new version is added as a branch. The person can step
  // back and forth between them. In your app, `branches` is the list of regenerated replies.
  const more = [
    "Components you own, not a dependency you rent.",
    "Copy it, change it, ship it.",
    "Accessible by default. Yours by design.",
    "Build faster without giving up control.",
  ];

  const branches = ref(["Beautiful components for Vue and Nuxt."]);
  const index = ref(0);
  const generating = ref(false);

  async function regenerate() {
    generating.value = true;
    await promiseTimeout(900);
    branches.value.push(more[(branches.value.length - 1) % more.length]!);
    index.value = branches.value.length - 1;
    generating.value = false;
  }
</script>
```

<!-- /automd -->

::

Branch keeps every version of a reply after it is regenerated. The person can step back and forth with the arrows and read "2 / 3" to know where they are. Regenerate adds a new version instead of replacing the old one, so nothing is lost.

## Installation

Branch is built with the [Message](/components/message), [Bubble](/components/bubble) and [Button](/components/button) components. The generating state uses the [shimmer](/utilities/shimmer) utility.

:prose-pm-x{command="ui-thing@latest add message bubble button"}

## Usage

Keep the versions in a list and the visible one in an index. The code above is the whole pattern: copy it and swap `regenerate` for a call to your backend.

- Adding a version moves the index to it, so the new reply shows straight away.
- Disable the arrows at the ends of the list, and while a reply is generating.
- Put the counter in an `aria-live="polite"` region so a screen reader announces the new position.
- The regenerate button gives feedback while it works: it spins and the reply area shimmers.

## AI SDK

With `@ai-sdk/vue`, call `regenerate()` on the `Chat` and keep the replaced assistant messages yourself. Before you regenerate, push the last assistant message into `branches`; when the new message finishes, push it too, and set `index` to the last branch.

```ts
const chat = new Chat({});

const branches = ref<UIMessage[]>([]);
const index = ref(0);

async function regenerate() {
  const last = chat.messages.at(-1);
  if (last?.role === "assistant" && !branches.value.includes(last)) branches.value.push(last);

  await chat.regenerate();

  branches.value.push(chat.messages.at(-1)!);
  index.value = branches.value.length - 1;
}
```

## Accessibility

- The arrows and the regenerate button are real buttons with labels: "Previous response", "Next response" and "Regenerate response".
- The counter is announced politely when it changes.
- Disabled arrows keep their place so the layout does not jump.
