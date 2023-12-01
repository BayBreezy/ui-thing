---
title: Button
description: A button is a component that is used to trigger an action.
---

## Source code

Click :SourceCodeLink{component="Button.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add button
```

## Usage

::ShowCase{component="DocsButtons"}

#code

```vue [DocsBadge.vue]
<template>
  <div>
    <div class="flex flex-wrap gap-5">
      <UiButton>Default</UiButton>
      <UiButton variant="secondary">Secondary</UiButton>
      <UiButton><Icon class="h-4 w-4" name="lucide:mail" /> Login with Email</UiButton>
      <UiButton loading
        ><Icon class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Please wait</UiButton
      >
      <UiButton variant="outline">Outline</UiButton>
      <UiButton variant="destructive">Destructive</UiButton>
      <UiButton variant="ghost">Ghost</UiButton>
      <UiButton variant="link">Link Btn</UiButton>
      <UiButton variant="outline" size="icon"
        ><Icon class="h-4 w-4" name="lucide:activity"
      /></UiButton>
    </div>
  </div>
</template>
```

::
