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

::ShowCase

:DocsSlider

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSlider.vue" code lang="vue" -->

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

<!-- /automd -->

::

### Multiple thumbs

::ShowCase

:DocsSliderMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderMultiple.vue" code lang="vue" -->

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

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/sliders). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Square Thumb

::ShowCase

:DocsSliderSquareThumb

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

::ShowCase

:DocsSliderSolidThumb

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

::ShowCase

:DocsSliderTinyThumb

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

::ShowCase

:DocsSliderReferenceLabels

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

::ShowCase

:DocsSliderTicks

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

::ShowCase

:DocsSliderOutput

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

::ShowCase

:DocsSliderLabels

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

::ShowCase

:DocsSliderLabelsTooltips

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

::ShowCase

:DocsSliderDualRange

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

::ShowCase

:DocsSliderDualRangeOutput

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

::ShowCase

:DocsSliderVolume

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

::ShowCase

:DocsSliderTemperature

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

::ShowCase

:DocsSliderInput

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

::ShowCase

:DocsSliderRateExp1

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

::ShowCase

:DocsSliderRateExpTooltip

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

### Dual Range w/ Input

::ShowCase

:DocsSliderDualRangeInput

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderDualRangeInput.vue" code lang="vue" -->

```vue [DocsSliderDualRangeInput.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel>Dual range slider with input</UiLabel>
      <div class="flex items-center gap-4">
        <UiInput
          v-model="value[0]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          inputmode="decimal"
          aria-label="Enter minimum value"
        />
        <UiSlider
          v-model="value"
          class="flex-grow"
          :min="minValue"
          :max="maxValue"
          aria-label="Dual range slider with input"
        />
        <UiInput
          v-model="value[1]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          inputmode="decimal"
          aria-label="Enter maximum value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0;
  const maxValue = 200;
  const initialValue = [50, 150];
  const value = ref(initialValue);
</script>
```

<!-- /automd -->

::

### Credits per Month

::ShowCase

:DocsSliderCreditsPerMonth

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderCreditsPerMonth.vue" code lang="vue" -->

```vue [DocsSliderCreditsPerMonth.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel class="tabular-nums">{{ value[0] }} credits/mo</UiLabel>
      <div class="flex items-center gap-4">
        <div>
          <UiButton
            variant="outline"
            size="icon"
            class="size-8"
            aria-label="Decrease value"
            :disabled="value[0] === 0"
            @click="decreaseValue"
          >
            <Icon name="lucide:minus" class="size-4" aria-hidden="true" />
          </UiButton>
        </div>
        <UiSlider
          v-model="value"
          class="flex-grow"
          :min="minValue"
          :max="maxValue"
          :step="steps"
          aria-label="Dual range slider with UiButtons"
        />
        <div>
          <UiButton
            variant="outline"
            size="icon"
            class="size-8"
            aria-label="Increase value"
            :disabled="value[0] === 200"
            @click="increaseValue"
          >
            <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0;
  const maxValue = 200;
  const steps = 5;
  const value = ref([100]);

  const decreaseValue = () => {
    if (value.value && value.value[0]) {
      value.value = [Math.max(minValue, value.value[0] - steps)];
    }
  };
  const increaseValue = () => {
    if (value.value && value.value[0]) {
      value.value = [Math.min(maxValue, value.value[0] + steps)];
    }
  };
</script>
```

<!-- /automd -->

::

### Money Range

::ShowCase

:DocsSliderMoneyRange

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderMoneyRange.vue" code lang="vue" -->

```vue [DocsSliderMoneyRange.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel class="tabular-nums">
        From {{ formatPrice(value[0] ?? min_price) }} to {{ formatPrice(value[1] ?? max_price) }}
      </UiLabel>
      <div class="flex items-center gap-4">
        <UiSlider
          v-model="value"
          :min="min_price"
          :max="max_price"
          aria-label="Price range slider"
        />
        <UiButton variant="outline">Go</UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const min_price = 5;
  const max_price = 1240;
  const value = ref([min_price, max_price]);

  const formatPrice = (price: number) => {
    return price === max_price ? `$${price.toLocaleString()}+` : `$${price.toLocaleString()}`;
  };
</script>
```

<!-- /automd -->

::

### Vertical

::ShowCase

:DocsSliderVertical

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderVertical.vue" code lang="vue" -->

```vue [DocsSliderVertical.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel class="justify-center">Vertical slider</UiLabel>
      <div class="flex h-40 justify-center">
        <UiSlider v-model="value" :max="10" orientation="vertical" aria-label="Vertical slider" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([5]);
</script>
```

<!-- /automd -->

::

### Vertical Input

::ShowCase

:DocsSliderVerticalInput

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderVerticalInput.vue" code lang="vue" -->

```vue [DocsSliderVerticalInput.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel class="justify-center">Vertical slider with input</UiLabel>
      <div class="flex h-40 flex-col items-center justify-center gap-4">
        <UiSlider
          v-model="value"
          class="data-[orientation=vertical]:min-h-0"
          :min="minValue"
          :max="maxValue"
          orientation="vertical"
          aria-label="Slider with input"
        />
        <UiInput
          v-model="value[0]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          inputmode="decimal"
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

### Vertical Dual Range w/ Tooltip

::ShowCase

:DocsSliderVerticalDualTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderVerticalDualTooltip.vue" code lang="vue" -->

```vue [DocsSliderVerticalDualTooltip.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel class="justify-center">Vertical dual range slider and tooltip</UiLabel>
      <div class="flex h-40 justify-center">
        <UiSlider v-model="value" :max="10" orientation="vertical" aria-label="Vertical slider">
          <template #thumb>
            <UiTooltip v-for="(t, i) in value.length" :key="i" disable-closing-trigger>
              <UiTooltipTrigger as-child>
                <UiSliderThumb />
              </UiTooltipTrigger>
              <UiTooltipContent side="right" align="center">{{
                value[i] !== undefined ? value[i] : ""
              }}</UiTooltipContent>
            </UiTooltip>
          </template>
        </UiSlider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([2, 7]);
</script>
```

<!-- /automd -->

::

### Object Position

::ShowCase

:DocsSliderObjectPosition

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderObjectPosition.vue" code lang="vue" -->

```vue [DocsSliderObjectPosition.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <legend class="text-sm font-medium text-foreground">Object position</legend>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <UiLabel class="text-xs text-muted-foreground">X</UiLabel>
          <UiSlider
            v-model="x"
            class="flex-grow [&>:last-child>div]:rounded"
            :min="minValue"
            :max="maxValue"
            aria-label="X"
          />
          <UiInput v-model="x[0]" class="h-8 w-12 px-2 py-1" type="text" aria-label="Enter value" />
        </div>
        <div class="flex items-center gap-2">
          <UiLabel class="text-xs text-muted-foreground">Y</UiLabel>
          <UiSlider
            v-model="y"
            class="flex-grow [&>:last-child>div]:rounded"
            :min="minValue"
            :max="maxValue"
            aria-label="Y"
          />
          <UiInput v-model="y[0]" class="h-8 w-12 px-2 py-1" type="text" aria-label="Enter value" />
        </div>
        <div class="flex items-center gap-2">
          <UiLabel class="text-xs text-muted-foreground">Z</UiLabel>
          <UiSlider
            v-model="z"
            class="flex-grow [&>:last-child>div]:rounded"
            :min="minValue"
            :max="maxValue"
            aria-label="Z"
          />
          <UiInput v-model="z[0]" class="h-8 w-12 px-2 py-1" type="text" aria-label="Enter value" />
        </div>
      </div>
      <UiButton class="w-full" variant="outline" @click="resetAll">
        <Icon name="lucide:rotate-ccw" class="-ms-1 me-2 size-4 opacity-60" aria-hidden="true" />
        Reset
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = -10;
  const maxValue = 10;

  const x = ref([-2]);
  const y = ref([4]);
  const z = ref([2]);

  const resetAll = () => {
    x.value = [0];
    y.value = [0];
    z.value = [0];
  };
</script>
```

<!-- /automd -->

::

### Price

::ShowCase

:DocsSliderPrice

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderPrice.vue" code lang="vue" -->

```vue [DocsSliderPrice.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Price slider</UiLabel>
      <div>
        <!-- Histogram bars  -->
        <div class="flex h-12 w-full items-end px-3" aria-hidden="true">
          <div
            v-for="(count, i) in itemCounts"
            :key="i"
            class="flex flex-1 justify-center"
            :style="{ height: `${(count / maxCount) * 100}%` }"
          >
            <span
              :data-selected="isBarInSelectedRange(i, minValue, priceStep, value)"
              class="h-full w-full bg-primary/20 data-[selected=true]:bg-emerald-500/70"
            />
          </div>
        </div>
        <UiSlider v-model="value" :min="minValue" :max="maxValue" aria-label="Price range" />
      </div>

      <!-- Inputs  -->
      <div class="flex items-center justify-between gap-4">
        <div class="space-y-1">
          <UiLabel for="min-price">Min price</UiLabel>
          <div class="relative">
            <UiInput
              id="min-price"
              v-model="value[0]"
              class="peer w-full ps-6"
              type="text"
              inputmode="decimal"
              aria-label="Enter minimum price"
            />
            <span
              class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
            >
              $
            </span>
          </div>
        </div>
        <div class="space-y-1">
          <UiLabel for="max-price">Max price</UiLabel>
          <div class="relative">
            <UiInput
              id="max-price"
              v-model="value[1]"
              class="peer w-full ps-6"
              type="text"
              inputmode="decimal"
              aria-label="Enter maximum price"
            />
            <span
              class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
            >
              $
            </span>
          </div>
        </div>
      </div>

      <!-- Button -->
      <UiButton class="w-full" variant="outline">
        Show {{ countItemsInRange(value[0] ?? 0, value[1] ?? 0) }} items
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { id: 1, price: 80 },
    { id: 2, price: 95 },
    { id: 3, price: 110 },
    { id: 4, price: 125 },
    { id: 5, price: 130 },
    { id: 6, price: 140 },
    { id: 7, price: 145 },
    { id: 8, price: 150 },
    { id: 9, price: 155 },
    { id: 10, price: 165 },
    { id: 11, price: 175 },
    { id: 12, price: 185 },
    { id: 13, price: 195 },
    { id: 14, price: 205 },
    { id: 15, price: 215 },
    { id: 16, price: 225 },
    { id: 17, price: 235 },
    { id: 18, price: 245 },
    { id: 19, price: 255 },
    { id: 20, price: 260 },
    { id: 21, price: 265 },
    { id: 22, price: 270 },
    { id: 23, price: 275 },
    { id: 24, price: 280 },
    { id: 25, price: 285 },
    { id: 26, price: 290 },
    { id: 27, price: 290 },
    { id: 28, price: 295 },
    { id: 29, price: 295 },
    { id: 30, price: 295 },
    { id: 31, price: 298 },
    { id: 32, price: 299 },
    { id: 33, price: 300 },
    { id: 34, price: 305 },
    { id: 35, price: 310 },
    { id: 36, price: 315 },
    { id: 37, price: 320 },
    { id: 38, price: 325 },
    { id: 39, price: 330 },
    { id: 40, price: 335 },
    { id: 41, price: 340 },
    { id: 42, price: 345 },
    { id: 43, price: 350 },
    { id: 44, price: 355 },
    { id: 45, price: 360 },
    { id: 46, price: 365 },
    { id: 47, price: 365 },
    { id: 48, price: 375 },
    { id: 49, price: 380 },
    { id: 50, price: 385 },
    { id: 51, price: 390 },
    { id: 52, price: 395 },
    { id: 53, price: 400 },
    { id: 54, price: 405 },
    { id: 55, price: 410 },
    { id: 56, price: 415 },
    { id: 57, price: 420 },
    { id: 58, price: 425 },
    { id: 59, price: 430 },
    { id: 60, price: 435 },
    { id: 61, price: 440 },
    { id: 62, price: 445 },
    { id: 63, price: 450 },
    { id: 64, price: 455 },
    { id: 65, price: 460 },
    { id: 66, price: 465 },
    { id: 67, price: 470 },
    { id: 68, price: 475 },
    { id: 69, price: 480 },
    { id: 70, price: 485 },
    { id: 71, price: 490 },
    { id: 72, price: 495 },
    { id: 73, price: 495 },
    { id: 74, price: 498 },
    { id: 75, price: 499 },
    { id: 76, price: 500 },
    { id: 77, price: 500 },
    { id: 78, price: 500 },
    { id: 79, price: 515 },
    { id: 80, price: 530 },
    { id: 81, price: 545 },
    { id: 82, price: 560 },
    { id: 83, price: 575 },
    { id: 84, price: 590 },
    { id: 85, price: 605 },
    { id: 86, price: 620 },
    { id: 87, price: 635 },
    { id: 88, price: 650 },
    { id: 89, price: 655 },
    { id: 90, price: 660 },
    { id: 91, price: 665 },
    { id: 92, price: 670 },
    { id: 93, price: 675 },
    { id: 94, price: 680 },
    { id: 95, price: 685 },
    { id: 96, price: 690 },
    { id: 97, price: 695 },
    { id: 98, price: 700 },
    { id: 99, price: 700 },
    { id: 100, price: 700 },
    { id: 101, price: 700 },
    { id: 102, price: 700 },
    { id: 103, price: 700 },
    { id: 104, price: 725 },
    { id: 105, price: 750 },
    { id: 106, price: 775 },
    { id: 107, price: 800 },
    { id: 108, price: 815 },
    { id: 109, price: 830 },
    { id: 110, price: 845 },
    { id: 111, price: 845 },
    { id: 112, price: 845 },
    { id: 113, price: 870 },
    { id: 114, price: 875 },
    { id: 115, price: 880 },
    { id: 116, price: 885 },
    { id: 117, price: 890 },
    { id: 118, price: 895 },
    { id: 119, price: 898 },
    { id: 120, price: 900 },
  ];

  // Define the number of ticks
  const tick_count = 40;
  // Find the min and max values across all items
  const minValue = Math.min(...items.map((item) => item.price));
  const maxValue = Math.max(...items.map((item) => item.price));
  const value = ref([200, 780]);
  // Calculate the price step based on the min and max prices
  const priceStep = (maxValue - minValue) / tick_count;

  // Calculate item counts for each price range
  const itemCounts = Array(tick_count)
    .fill(0)
    .map((_, tick) => {
      const rangeMin = minValue + tick * priceStep;
      const rangeMax = minValue + (tick + 1) * priceStep;
      return items.filter((item) => item.price >= rangeMin && item.price < rangeMax).length;
    });

  // Find maximum count for scaling
  const maxCount = Math.max(...itemCounts);

  // Function to count items in the selected range
  const countItemsInRange = (min: number, max: number) => {
    return items.filter((item) => item.price >= min && item.price <= max).length;
  };

  const isBarInSelectedRange = (
    index: number,
    minValue: number,
    priceStep: number,
    sliderValue: number[]
  ) => {
    const rangeMin = minValue + index * priceStep;
    const rangeMax = minValue + (index + 1) * priceStep;
    return (
      countItemsInRange(sliderValue[0] ?? 0, sliderValue[1] ?? 0) > 0 &&
      rangeMin <= (sliderValue[1] ?? 0) &&
      rangeMax >= (sliderValue[0] ?? 0)
    );
  };
</script>
```

<!-- /automd -->

::

### Equalizer

::ShowCase

:DocsSliderEqualizer

#code

<!-- automd:file src="../../app/components/content/Docs/Slider/DocsSliderEqualizer.vue" code lang="vue" -->

```vue [DocsSliderEqualizer.vue]
<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <legend class="text-center text-sm font-medium text-foreground">Equalizer</legend>
      <div class="flex h-48 justify-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v1"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="60 Hz"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v1.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v1[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">60</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v2"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="250 Hz"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v2.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v2[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">250</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v3"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="1k"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v3.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v3[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">1k</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v4"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="4k"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v4.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v4[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">4k</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v5"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="16k"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v5.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v5[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">16K</UiLabel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const min = -5;
  const max = 5;
  const v1 = ref([2]);
  const v2 = ref([1]);
  const v3 = ref([-1]);
  const v4 = ref([-3]);
  const v5 = ref([2]);
</script>
```

<!-- /automd -->

::
