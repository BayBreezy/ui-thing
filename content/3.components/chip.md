---
title: Chip
description: A component used to display some sort of indicator on another component.
---

## Source code

Click :SourceCodeLink{component="Chip.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add chip
```

## Usage

### Basic

::ShowCase

:DocsChip

#code

<!-- automd:file src="../../app/components/content/Docs/Chip/DocsChip.vue" code lang="vue" -->

```vue [DocsChip.vue]
<template>
  <div class="flex w-full justify-center">
    <UiChip>
      <UiButton size="icon-sm" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>
```

<!-- /automd -->

::

### Size

Pass a size to the `size` prop to change the size of the chip.

::ShowCase

:DocsChipSize

#code

<!-- automd:file src="../../app/components/content/Docs/Chip/DocsChipSize.vue" code lang="vue" -->

```vue [DocsChipSize.vue]
<template>
  <div class="flex w-full flex-wrap justify-center gap-4">
    <UiChip v-for="s in sizes" :key="s" :size="s">
      <UiButton size="icon-sm" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;
</script>
```

<!-- /automd -->

::

### Color

You can change the color of the chip by passing any tailwind color `bg` class to the `color` prop.

::ShowCase

:DocsChipColor

#code

<!-- automd:file src="../../app/components/content/Docs/Chip/DocsChipColor.vue" code lang="vue" -->

```vue [DocsChipColor.vue]
<template>
  <div class="flex w-full justify-center">
    <UiChip color="bg-destructive">
      <UiButton size="icon-sm" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>
```

<!-- /automd -->

::

### Text

You can display a text inside the chip by passing a `string` to the `text` prop.

::ShowCase

:DocsChipText

#code

<!-- automd:file src="../../app/components/content/Docs/Chip/DocsChipText.vue" code lang="vue" -->

```vue [DocsChipText.vue]
<template>
  <div class="flex w-full justify-center gap-4">
    <UiInput v-model="text" type="number" class="w-20" />
    <UiChip class="bg-sky-500 text-white" size="2xl" :text="text?.toString()">
      <UiButton size="icon" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>

<script lang="ts" setup>
  const text = ref(3);
</script>
```

<!-- /automd -->

::

### Inset

The `inset` prop can be used to move the indicator closer to the element.

::ShowCase

:DocsChipInset

#code

<!-- automd:file src="../../app/components/content/Docs/Chip/DocsChipInset.vue" code lang="vue" -->

```vue [DocsChipInset.vue]
<template>
  <div class="flex w-full flex-wrap justify-center gap-4">
    <UiChip size="xl" :inset="false">
      <UiButton size="icon" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
    <UiChip size="xl" inset>
      <UiButton size="icon" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>
```

<!-- /automd -->

::
