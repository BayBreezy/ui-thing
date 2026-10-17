---
title: Snippet
description: A command the reader can copy in one click, with a package manager switch.
label: New
---

::prose-show-case

:DocsAiSnippet

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Snippet/DocsAiSnippet.vue" code lang="vue" -->

```vue [DocsAiSnippet.vue]
<template>
  <div class="mx-auto w-full max-w-md space-y-3 py-6">
    <UiInputGroup>
      <UiInputGroupAddon>
        <UiInputGroupText class="font-mono">$</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupInput readonly :model-value="command" class="font-mono" aria-label="Command" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton
          size="icon-xs"
          :aria-label="copied ? 'Copied' : 'Copy command'"
          @click="copy(command)"
        >
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>

    <!-- Let the reader pick their package manager -->
    <UiTabs v-model="manager">
      <UiTabsList class="w-full">
        <UiTabsTrigger v-for="m in managers" :key="m.name" :value="m.name">
          {{ m.name }}
        </UiTabsTrigger>
      </UiTabsList>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const managers = [
    { name: "bun", run: "bunx" },
    { name: "npm", run: "npx" },
    { name: "pnpm", run: "pnpm dlx" },
    { name: "yarn", run: "yarn dlx" },
  ];

  const manager = ref("bun");
  const command = computed(
    () => `${managers.find((m) => m.name === manager.value)!.run} ui-thing@latest add trace`
  );

  const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true });
</script>
```

<!-- /automd -->

::

Snippet shows a short command in a read-only field with a copy button. Agents answer with commands all the time, and this keeps them easy to copy. The package manager tabs let the reader switch between `bun`, `npm`, `pnpm` and `yarn`.

## Installation

Snippet is built with the [Input Group](/components/input-group) and [Tabs](/components/tabs) components.

:prose-pm-x{command="ui-thing@latest add input-group tabs"}

## Usage

The command is a `computed` of the chosen package manager. The copy button swaps its icon to a check for two seconds and announces "Copied" in a polite live region.

- Use `readonly`, not `disabled`, so the text can still be selected.
- Keep the `font-mono` class on the input so the characters line up.
- For output with more than one line, use a [Code Block](/components/code-block) instead.

## Accessibility

- The field has an `aria-label`, and the copy button changes its label when it copies.
- Copying is announced through an `aria-live="polite"` region.
