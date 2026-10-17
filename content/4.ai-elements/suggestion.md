---
title: Suggestion
description: A short prompt you can send to the agent in one click.
label: New
---

::prose-show-case

:DocsAiSuggestion

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Suggestion/DocsAiSuggestion.vue" code lang="vue" -->

```vue [DocsAiSuggestion.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg flex-col gap-6 py-6 text-sm">
    <div v-if="turn" class="flex flex-col gap-4">
      <UiMessage align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ turn.prompt }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage>
        <UiMessageContent>
          <p>{{ turn.reply }}</p>
        </UiMessageContent>
      </UiMessage>
    </div>
    <div class="flex flex-col gap-2">
      <div class="scroll-fade-x flex scrollbar-none gap-2 overflow-x-auto overscroll-x-contain">
        <UiButton
          v-for="suggestion in suggestions"
          :key="suggestion"
          variant="outline"
          size="sm"
          class="shrink-0"
          @click="send(suggestion)"
        >
          {{ suggestion }}
        </UiButton>
      </div>
      <form ref="formRef" @submit.prevent="onSubmit">
        <UiInputGroup>
          <UiInputGroupTextarea
            v-model="text"
            placeholder="Ask the agent to change your code..."
            class="p-3"
            @keydown="onKeydown"
          />
          <UiInputGroupAddon align="block-end">
            <UiInputGroupButton
              size="icon-sm"
              variant="outline"
              class="rounded-full"
              aria-label="Attach files"
            >
              <Icon name="lucide:plus" class="size-4" />
            </UiInputGroupButton>
            <UiInputGroupButton
              type="submit"
              size="icon-sm"
              variant="default"
              class="ml-auto rounded-full"
              :disabled="!canSend"
              aria-label="Send"
            >
              <Icon name="lucide:arrow-up" class="size-4" />
            </UiInputGroupButton>
          </UiInputGroupAddon>
        </UiInputGroup>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const suggestions = [
    "Add a dark mode toggle",
    "Fix the failing build",
    "Write tests for the form",
    "Upgrade to Nuxt 4",
    "Add a loading state",
    "Find unused dependencies",
  ];

  const replies: Record<string, string> = {
    "Add a dark mode toggle":
      "Added a ModeToggle to the site header. It calls useColorMode from @vueuse/core.",
    "Fix the failing build":
      "The build failed on a missing import in pages/index.vue. I added it and the build passes.",
    "Write tests for the form":
      "Added four tests in SignupForm.test.ts. They cover the empty, invalid and valid states.",
    "Upgrade to Nuxt 4":
      "Ran the codemod and bumped nuxt to 4. Two pages needed the new app/ directory, so I moved them.",
    "Add a loading state":
      "Added a loading state to the dashboard page. It shows skeletons while the data loads.",
    "Find unused dependencies":
      "Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?",
  };

  const text = ref("");
  const turn = ref<{ prompt: string; reply: string } | null>(null);
  const formRef = ref<HTMLFormElement | null>(null);
  const canSend = computed(() => text.value.trim().length > 0);

  function send(prompt: string) {
    turn.value = {
      prompt,
      reply: replies[prompt] ?? "This demo only knows the suggestions. Pick one.",
    };
    text.value = "";
  }

  function onSubmit() {
    if (!canSend.value) return;

    send(text.value.trim());
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.value?.requestSubmit();
    }
  }
</script>
```

<!-- /automd -->

::

Suggestion is a prompt you send without typing. Each one is a [Button](/components/button) with the prompt as its label. Put a row of them above the [Prompt Input](/ai-elements/prompt-input).

## Installation

Suggestion is built with the [Button](/components/button) component.

:prose-pm-x{command="ui-thing@latest add button"}

## Usage

```vue
<template>
  <div class="scroll-fade-x flex scrollbar-none gap-2 overflow-x-auto overscroll-x-contain">
    <UiButton
      v-for="suggestion in suggestions"
      :key="suggestion"
      variant="outline"
      size="sm"
      class="shrink-0"
      @click="send(suggestion)"
    >
      {{ suggestion }}
    </UiButton>
  </div>
</template>
```

## Scrolling

The row scrolls sideways when the suggestions do not fit. [`scroll-fade-x`](/utilities/scroll-fade) fades the edge that has more to show, and `shrink-0` keeps each label on one line.

## AI SDK

The label is the message. Send it as is.

```ts
chat.sendMessage({ text: suggestion });
```

