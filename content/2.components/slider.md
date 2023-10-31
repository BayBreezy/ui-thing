---
title: Slider
description: An input where the user selects a value from within a given range.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/slider.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/slider.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Slider"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add slider
```

## Usage

### Basic example

::ShowCase{component="DocsSlider"}

#code

```vue [DocsSlider.vue]
<template>
  <div class="flex w-full flex-col gap-4">
    <p class="font-semibold">Value {{ sliderValue }}</p>
    <UISlider v-model="sliderValue" />
  </div>
</template>

<script lang="ts" setup>
  const sliderValue = ref([50]);
</script>
```

::

### Multiple thumbs

::ShowCase{component="DocsSliderMultiple"}

#code

```vue [DocsSliderMultiple.vue]
<template>
  <div class="flex w-full flex-col gap-4">
    <p class="font-semibold">Range {{ rangeValue }}</p>
    <UISlider v-model="rangeValue" :max="250" />
  </div>
</template>

<script lang="ts" setup>
  const rangeValue = ref([25, 75, 150]);
</script>
```

::
