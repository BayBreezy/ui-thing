---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/progress.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/progress.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Progress"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add progress"}

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

::prose-show-case

:DocsProgress

#code

<!-- automd:file src="../../app/components/content/Docs/Progress/DocsProgress.vue" code lang="vue" -->

```vue [DocsProgress.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2">
    <div class="flex justify-between text-sm">
      <span>Progress</span>
      <span class="text-muted-foreground">{{ value }}%</span>
    </div>
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

### Loader

::prose-show-case

:DocsProgressLoading

#code

<!-- automd:file src="../../app/components/content/Docs/Progress/DocsProgressLoading.vue" code lang="vue" -->

```vue [DocsProgressLoading.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2">
    <div class="flex justify-between text-sm">
      <span>{{ counter == 100 ? "Complete" : "Loading..." }}</span>
      <span class="text-muted-foreground">{{ counter }}%</span>
    </div>
    <UiProgress class="h-2 [--primary:var(--color-blue-500)]" :model-value="counter" />
  </div>
</template>

<script lang="ts" setup>
  const { pause, counter } = useInterval(100, {
    controls: true,
  });
  watch(counter, (v) => {
    if (v === 100) pause();
  });
</script>
```

<!-- /automd -->

::
