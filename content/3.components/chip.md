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

::

### Size

Pass a size to the `size` prop to change the size of the chip.

::ShowCase

:DocsChipSize

#code

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

::

### Color

You can change the color of the chip by passing any tailwind color `bg` class to the `color` prop.

::ShowCase

:DocsChipColor

#code

```vue [DocsChipColor.vue]
<template>
  <template>
    <div class="flex w-full justify-center">
      <UiChip color="bg-destructive">
        <UiButton size="icon-sm" variant="outline">
          <Icon name="lucide:inbox" class="size-5" />
        </UiButton>
      </UiChip>
    </div>
  </template>
</template>
```

::

### Text

You can display a text inside the chip by passing a `string` to the `text` prop.

::ShowCase

:DocsChipText

#code

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

::

### Inset

The `inset` prop can be used to move the indicator closer to the element.

::ShowCase

:DocsChipInset

#code

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

::
