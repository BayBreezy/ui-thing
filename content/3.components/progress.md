---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/progress.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/progress.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Progress"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add progress
```

## Anatomy

```vue
<template>
  <UiProgress>
    <UiProgressIndicator :style="{ transform: `translateX(-${100 - (modelValue || 0)}%)` }" />
  </UiProgress>
</template>
```

## Usage

### Full example

::ShowCase

:DocsProgress

#code

<!-- automd:file src="../../app/components/content/Docs/Progress/DocsProgress.vue" code lang="vue" -->

```vue [DocsProgress.vue]
<template>
  <div class="flex w-full justify-center">
    <UiProgress v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref(10);

  useIntervalFn(() => {
    // set value to a random number between 0 and 100
    value.value = Math.floor(Math.random() * 100);
  }, 3000);
</script>
```

<!-- /automd -->

::
