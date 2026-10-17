---
title: Artifact
description: A file the agent made, shown beside the chat with actions to copy, download or close it.
label: New
---

::prose-show-case

:DocsAiArtifact

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Artifact/DocsAiArtifact.vue" code lang="vue" -->

```vue [DocsAiArtifact.vue]
<template>
  <div class="mx-auto w-full max-w-lg py-6">
    <UiCard v-if="open" class="gap-0 overflow-hidden py-0">
      <UiCardHeader class="flex flex-row items-center gap-3 border-b px-4 py-3">
        <div class="min-w-0 flex-1">
          <UiCardTitle class="flex items-center gap-2 text-sm">
            <Icon name="lucide:file-code" class="text-muted-foreground size-4 shrink-0" />
            <span class="truncate">useDebounce.ts</span>
            <UiBadge variant="secondary" class="shrink-0">v2</UiBadge>
          </UiCardTitle>
          <UiCardDescription class="text-xs">Generated 2 minutes ago</UiCardDescription>
        </div>
        <div class="-me-1 flex items-center gap-1">
          <UiCodeBlockCopyButton :value="code" />
          <UiCodeBlockDownloadButton :value="code" filename="useDebounce.ts" />
          <UiButton variant="ghost" size="icon-xs" aria-label="Close" @click="open = false">
            <Icon name="lucide:x" class="size-4" />
          </UiButton>
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <UiCodeBlock :code="code" language="ts" class="rounded-none border-0">
          <UiCodeBlockContent line-numbers class="max-h-72" />
        </UiCodeBlock>
      </UiCardContent>
    </UiCard>

    <UiButton v-else variant="outline" size="sm" @click="open = true">
      <Icon name="lucide:file-code" class="size-4" />
      Reopen useDebounce.ts
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  const code = `export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value);

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay);
    onCleanup(() => clearTimeout(timeout));
  });

  return debounced;
}`;
</script>
```

<!-- /automd -->

::

An artifact is something the agent made that the person wants to keep: a file, a snippet or a document. It sits in its own card with a title, a version and a few actions, and shows its content in a [Code Block](/components/code-block).

## Installation

Artifact is built with the [Card](/components/card), [Badge](/components/badge), [Button](/components/button) and [Code Block](/components/code-block) components.

:prose-pm-x{command="ui-thing@latest add card badge button code-block"}

## Usage

The header holds the title, the version badge and the actions. The content is a `UiCodeBlock` with the corners and border removed, so it sits flush in the card.

- `UiCodeBlockCopyButton` and `UiCodeBlockDownloadButton` work outside a code block when you pass `value` (and `filename`).
- Cap the height with a `max-h-*` class on `UiCodeBlockContent`. The content scrolls and fades at its edges.
- To show something other than code, put it in `UiCardContent` instead.

## Variations

- **Preview and code.** Add [Tabs](/components/tabs) to the header, with the rendered result in one tab and the code in the other.
- **Versions.** Pair it with [Branch](/ai-elements/branch) so the person can step between versions of the file.
- **Side panel.** Put the card in a [Sheet](/components/sheet) or a split pane next to the chat, and open it from a [Tool](/ai-elements/tool) result.

## Accessibility

- Every action is a button with a label.
- The title is the accessible name of the card. If the card can be closed, return focus to the control that opened it.
