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
label: New Examples
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
    <UiSlider v-model="sliderValue" />
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
    <UiSlider v-model="rangeValue" :max="250" />
  </div>
</template>

<script lang="ts" setup>
  const rangeValue = ref([25, 75, 150]);
</script>
```

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/sliders). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Square Thumb

::ShowCase{component="DocsSliderSquareThumb"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderSquareThumb.vue" code lang="vue" -->

```vue [DocsSliderSquareThumb.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with square thumb</UiLabel>
      <UiSlider
        v-model="value"
        :step="10"
        :max="100"
        class="[&>div[role=slider]]:rounded"
        aria-label="Slider with square thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
```

<!-- /automd -->

::

### Solid Thumb

::ShowCase{component="DocsSliderSolidThumb"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderSolidThumb.vue" code lang="vue" -->

```vue [DocsSliderSolidThumb.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with solid thumb</UiLabel>
      <UiSlider
        v-model="value"
        class="[&>:first-child>span]:opacity-70 [&_div[role=slider]]:bg-primary"
        aria-label="Slider with solid thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
```

<!-- /automd -->

::

### Tiny Thumb

::ShowCase{component="DocsSliderTinyThumb"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderTinyThumb.vue" code lang="vue" -->

```vue [DocsSliderTinyThumb.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with tiny thumb</UiLabel>
      <UiSlider
        v-model="value"
        class="[&_div[role=slider]]:h-6 [&_div[role=slider]]:w-2.5 [&_div[role=slider]]:border-[3px] [&_div[role=slider]]:border-background [&_div[role=slider]]:bg-primary [&_div[role=slider]]:ring-offset-0"
        aria-label="Slider with tiny thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
```

<!-- /automd -->

::

### Reference Labels

::ShowCase{component="DocsSliderReferenceLabels"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderReferenceLabels.vue" code lang="vue" -->

```vue [DocsSliderReferenceLabels.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with reference labels</UiLabel>
      <div>
        <UiSlider v-model="value" :min="5" :max="35" aria-label="Slider with reference labels" />
        <div
          class="mt-4 flex w-full items-center justify-between gap-1 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span v-for="size in [5, 20, 35]" :key="size">{{ size }} GB</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([15]);
</script>
```

<!-- /automd -->

::

### Ticks

::ShowCase{component="DocsSliderTicks"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderTicks.vue" code lang="vue" -->

```vue [DocsSliderTicks.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with ticks</UiLabel>
      <div>
        <UiSlider v-model="value" :max="max" aria-label="Slider with ticks" />
        <span
          class="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span
            v-for="(_, i) in ticks"
            :key="i"
            class="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span :class="['h-1 w-px bg-muted-foreground/70', i % skipInterval !== 0 && 'h-0.5']" />
            <span :class="[i % skipInterval === 0 && 'opacity-0']">{{ i }}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const max = 12;
  const skipInterval = 2; // Set to 1 to allow no text skipping
  const ticks = [...Array(max + 1)].map((_, i) => i);
  const value = ref([5]);
</script>
```

<!-- /automd -->

::

### Slider w/ Output

::ShowCase{component="DocsSliderOutput"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderOutput.vue" code lang="vue" -->

```vue [DocsSliderOutput.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Slider with output</UiLabel>
        <output class="text-sm font-medium tabular-nums">{{ value[0] }}</output>
      </div>
      <UiSlider v-model="value" aria-label="Slider with output" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
```

<!-- /automd -->

::

### Slider w/ Labels

::ShowCase{component="DocsSliderLabels"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderLabels.vue" code lang="vue" -->

```vue [DocsSliderLabels.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with labels</UiLabel>
      <div>
        <span
          class="mb-3 flex w-full items-center justify-between gap-2 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span>Low</span>
          <span>High</span>
        </span>
        <UiSlider v-model="value" :step="10" aria-label="Slider with labels" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
```

<!-- /automd -->

::

### Slider w/ Labels & Tooltip

::ShowCase{component="DocsSliderLabelsTooltips"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderLabelsTooltips.vue" code lang="vue" -->

```vue [DocsSliderLabelsTooltips.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with labels and tooltip</UiLabel>
      <div>
        <span
          class="mb-3 flex w-full items-center justify-between gap-2 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span>Low</span>
          <span>High</span>
        </span>
        <UiSlider
          v-model="value"
          :step="10"
          show-tooltip
          aria-label="Slider with labels and tooltip"
        >
          <template #thumb>
            <UiTooltip v-for="(t, i) in value.length" :key="i" disable-closing-trigger>
              <UiTooltipTrigger as-child>
                <UiSliderThumb />
              </UiTooltipTrigger>
              <UiTooltipContent align="center">{{ value[i] }}</UiTooltipContent>
            </UiTooltip>
          </template>
        </UiSlider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
```

<!-- /automd -->

::

### Dual Range

::ShowCase{component="DocsSliderDualRange"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderDualRange.vue" code lang="vue" -->

```vue [DocsSliderDualRange.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Dual range slider</UiLabel>
      <UiSlider v-model="value" :step="10" aria-label="Dual range slider" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([25, 75]);
</script>
```

<!-- /automd -->

::

### Dual Range w/ Output

::ShowCase{component="DocsSliderDualRangeOutput"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderDualRangeOutput.vue" code lang="vue" -->

```vue [DocsSliderDualRangeOutput.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Dual range slider with output</UiLabel>
        <output class="text-sm font-medium tabular-nums"> {{ value[0] }} - {{ value[1] }} </output>
      </div>
      <UiSlider v-model="value" aria-label="Dual range slider with output" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([25, 75]);
</script>
```

<!-- /automd -->

::

### Volume

::ShowCase{component="DocsSliderVolume"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderVolume.vue" code lang="vue" -->

```vue [DocsSliderVolume.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Volume</UiLabel>
        <output class="text-sm font-medium tabular-nums">{{ value[0] }}</output>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="lucide:volume-x" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
        <UiSlider v-model="value" aria-label="Volume slider" />
        <Icon name="lucide:volume-2" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([25]);
</script>
```

<!-- /automd -->

::

### Temperature

::ShowCase{component="DocsSliderTemperature"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderTemperature.vue" code lang="vue" -->

```vue [DocsSliderTemperature.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <UiLabel>Temperature</UiLabel>
        <div class="flex items-center gap-1">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                size="icon"
                variant="ghost"
                class="size-7"
                aria-label="Reset"
                @click="value = defaultValue"
              >
                <Icon name="lucide:rotate-ccw" class="size-4" aria-hidden="true" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent align="center" class="px-2 py-1 text-xs"
              >Reset to default</UiTooltipContent
            >
          </UiTooltip>
          <UiInput
            v-model="value[0]"
            class="h-7 w-12 px-2 py-0"
            type="text"
            input-mode="decimal"
            aria-label="Enter value"
          />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <UiSlider
          v-model="value"
          :min="minValue"
          :max="maxValue"
          :step="0.01"
          aria-label="Temperature"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0.0;
  const maxValue = 2;
  const defaultValue = [1];
  const value = ref([1.25]);

  watchEffect(() => {
    if (!value.value) return (value.value = defaultValue);
    if (!value.value[0]) return (value.value = defaultValue);
    if (value.value[0] < minValue) {
      value.value[0] = minValue;
    } else if (value.value[0] > maxValue) {
      value.value[0] = maxValue;
    }
  });
</script>
```

<!-- /automd -->

::

### Input

::ShowCase{component="DocsSliderInput"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderInput.vue" code lang="vue" -->

```vue [DocsSliderInput.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel>Slider with input</UiLabel>
      <div class="flex items-center gap-4">
        <UiSlider
          v-model="value"
          class="flex-grow"
          :min="minValue"
          :max="maxValue"
          aria-label="Slider with input"
        />
        <UiInput
          v-model="value[0]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          input-mode="decimal"
          aria-label="Enter value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0;
  const maxValue = 100;
  const initialValue = [25];
  const value = ref(initialValue);
</script>
```

<!-- /automd -->

::

### Rate your experience

::ShowCase{component="DocsSliderRateExp1"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderRateExp1.vue" code lang="vue" -->

```vue [DocsSliderRateExp1.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Rate your experience</UiLabel>
        <span class="text-sm font-medium">{{
          value[0] !== undefined ? labels[value[0] - 1] : ""
        }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-2xl">😡</span>
        <UiSlider v-model="value" :min="1" :max="5" aria-label="Rate your experience" />
        <span class="text-2xl">😍</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];
  const value = ref([3]);
</script>
```

<!-- /automd -->

::

### Rate your experience (tooltip)

::ShowCase{component="DocsSliderRateExpTooltip"}

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderRateExpTooltip.vue" code lang="vue" -->

```vue [DocsSliderRateExpTooltip.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel>Rate your experience</UiLabel>
      <div class="flex items-center gap-2">
        <UiSlider v-model="value" :min="1" :max="5" aria-label="Rate your experience">
          <template #thumb>
            <UiTooltip v-for="(t, i) in value.length" :key="i" disable-closing-trigger>
              <UiTooltipTrigger as-child>
                <UiSliderThumb />
              </UiTooltipTrigger>
              <UiTooltipContent align="center">{{
                value[i] !== undefined ? labels[value[i] - 1] : ""
              }}</UiTooltipContent>
            </UiTooltip>
          </template>
        </UiSlider>
        <span v-if="value[0] !== undefined" class="text-2xl">{{ emojis[value[0] - 1] }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emojis = ["😡", "🙁", "😐", "🙂", "😍"];
  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];
  const value = ref([3]);
</script>
```

<!-- /automd -->

::
