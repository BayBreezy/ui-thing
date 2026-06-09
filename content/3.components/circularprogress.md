---
title: Circular Progress
description: A circular SVG progress indicator that displays task completion, supports step-based progress, size and color variants, an indeterminate spinning state, and an optional center label slot.
---

## Source code

Click :SourceCodeLink{component="CircularProgress.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add circular-progress"}

## Usage

### Basic

A simple progress indicator. The `progress` prop accepts a value between `0` and `1`.

::prose-show-case

:DocsCircularProgressBasic

#code

<!-- automd:file src="../../app/components/content/Docs/CircularProgress/DocsCircularProgressBasic.vue" code lang="vue" -->

```vue [DocsCircularProgressBasic.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCircularProgress :progress="progress" show-value size="lg" />
  </div>
</template>

<script lang="ts" setup>
  const progress = ref(0.3);

  useIntervalFn(() => {
    progress.value = parseFloat(Math.random().toFixed(2));
  }, 2000);
</script>
```

<!-- /automd -->

::

### Sizes

Five size presets are available: `xs`, `sm`, `default`, `lg`, and `xl`. Each preset sets a sensible radius and stroke width. You can override either with the `radius` and `stroke-width` props.

::prose-show-case

:DocsCircularProgressSizes

#code

<!-- automd:file src="../../app/components/content/Docs/CircularProgress/DocsCircularProgressSizes.vue" code lang="vue" -->

```vue [DocsCircularProgressSizes.vue]
<template>
  <div class="flex flex-wrap items-end justify-center gap-6">
    <div v-for="s in sizes" :key="s" class="flex flex-col items-center gap-2">
      <UiCircularProgress :size="s" :progress="0.65" />
      <span class="text-muted-foreground text-xs">{{ s }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CircularProgressVariants } from "@/components/Ui/CircularProgress.vue";

  const sizes: NonNullable<CircularProgressVariants["size"]>[] = [
    "xs",
    "sm",
    "default",
    "lg",
    "xl",
  ];
</script>
```

<!-- /automd -->

::

### Colors

The `color` prop accepts `default`, `secondary`, `success`, `warning`, or `destructive`. All colors map to semantic design tokens so they automatically adapt to the active theme.

::prose-show-case

:DocsCircularProgressColors

#code

<!-- automd:file src="../../app/components/content/Docs/CircularProgress/DocsCircularProgressColors.vue" code lang="vue" -->

```vue [DocsCircularProgressColors.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <div v-for="c in colors" :key="c" class="flex flex-col items-center gap-2">
      <UiCircularProgress :color="c" :progress="0.65" size="lg" show-value />
      <span class="text-muted-foreground text-xs capitalize">{{ c }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CircularProgressVariants } from "@/components/Ui/CircularProgress.vue";

  const colors: NonNullable<CircularProgressVariants["color"]>[] = [
    "default",
    "secondary",
    "success",
    "warning",
    "destructive",
  ];
</script>
```

<!-- /automd -->

::

### Step-based progress

Pass `current-step` and `total-steps` to drive progress from a wizard or multi-step flow. The value is automatically clamped to `[0, 1]`.

::prose-show-case

:DocsCircularProgressSteps

#code

<!-- automd:file src="../../app/components/content/Docs/CircularProgress/DocsCircularProgressSteps.vue" code lang="vue" -->

```vue [DocsCircularProgressSteps.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <UiCircularProgress
      :current-step="currentStep"
      :total-steps="totalSteps"
      size="xl"
      show-value
    />
    <p class="text-muted-foreground text-sm">Step {{ currentStep }} of {{ totalSteps }}</p>
    <div class="flex items-center gap-2">
      <UiButton size="sm" variant="outline" :disabled="currentStep <= 1" @click="currentStep--">
        Previous
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :disabled="currentStep >= totalSteps"
        @click="currentStep++"
      >
        Next
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const currentStep = ref(2);
  const totalSteps = ref(5);
</script>
```

<!-- /automd -->

::

### Indeterminate

Set `indeterminate` when the progress is unknown. The SVG spins and the component switches to `role="status"` with an `aria-label` of `"Loading"`.

::prose-show-case

:DocsCircularProgressIndeterminate

#code

<!-- automd:file src="../../app/components/content/Docs/CircularProgress/DocsCircularProgressIndeterminate.vue" code lang="vue" -->

```vue [DocsCircularProgressIndeterminate.vue]
<template>
  <div class="flex flex-wrap items-end justify-center gap-6">
    <div v-for="s in sizes" :key="s" class="flex flex-col items-center gap-2">
      <UiCircularProgress :size="s" indeterminate />
      <span class="text-muted-foreground text-xs">{{ s }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CircularProgressVariants } from "@/components/Ui/CircularProgress.vue";

  const sizes: NonNullable<CircularProgressVariants["size"]>[] = [
    "xs",
    "sm",
    "default",
    "lg",
    "xl",
  ];
</script>
```

<!-- /automd -->

::

### Custom label

The default slot renders centered inside the circle. Use it for icons, text, or any custom content. The `show-value` prop is a convenience shorthand that renders the percentage when no slot is provided.

::prose-show-case

:DocsCircularProgressCustomLabel

#code

<!-- automd:file src="../../app/components/content/Docs/CircularProgress/DocsCircularProgressCustomLabel.vue" code lang="vue" -->

```vue [DocsCircularProgressCustomLabel.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-8">
    <UiCircularProgress :progress="0.8" size="xl">
      <Icon name="lucide:check" class="text-primary size-5" />
    </UiCircularProgress>
    <UiCircularProgress :progress="0.45" size="xl" color="warning">
      <Icon name="lucide:zap" class="size-5 text-yellow-500 dark:text-yellow-400" />
    </UiCircularProgress>
    <UiCircularProgress :progress="0.2" size="xl" color="destructive">
      <Icon name="lucide:x" class="text-destructive size-5" />
    </UiCircularProgress>
    <UiCircularProgress :progress="1" size="xl" color="success">
      <Icon name="lucide:badge-check" class="size-5 text-green-500 dark:text-green-400" />
    </UiCircularProgress>
  </div>
</template>
```

<!-- /automd -->

::
