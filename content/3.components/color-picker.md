---
title: Color Picker
description: A fully-featured color picker component with support for multiple color formats, alpha channel, and preset swatches.
label: New
---

## Source code

Click :SourceCodeLink{component="ColorPicker"} to see the source code for this component on GitHub.

## Installation

:prose-pm-x{command="ui-thing@latest add color-picker"}

## Usage

### Basic

::ShowCase

:DocsColorPickerBasic

#code

<!-- automd:file src="../../app/components/content/Docs/ColorPicker/DocsColorPickerBasic.vue" code lang="vue" -->

```vue [DocsColorPickerBasic.vue]
<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" />
    <div class="text-sm text-muted-foreground">
      Selected color: <span class="font-mono font-semibold">{{ color }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#FF5833");
</script>
```

<!-- /automd -->

::

### With Alpha Channel

Enable alpha/opacity control by setting `show-alpha` to `true`.

::ShowCase

:DocsColorPickerAlpha

#code

<!-- automd:file src="../../app/components/content/Docs/ColorPicker/DocsColorPickerAlpha.vue" code lang="vue" -->

```vue [DocsColorPickerAlpha.vue]
<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" show-alpha />
    <div class="text-sm text-muted-foreground">
      Selected color: <span class="font-mono font-semibold">{{ color }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#FF583380");
</script>
```

<!-- /automd -->

::

### Multiple Formats

The color picker supports HEX, RGB, HSL, and HSV formats. Users can toggle between formats using the dropdown selector.

::ShowCase

:DocsColorPickerFormats

#code

<!-- automd:file src="../../app/components/content/Docs/ColorPicker/DocsColorPickerFormats.vue" code lang="vue" -->

```vue [DocsColorPickerFormats.vue]
<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" :format="format" @update:format="format = $event" />
    <div class="flex flex-wrap gap-2 text-sm text-muted-foreground">
      <div>
        HEX: <span class="font-mono font-semibold">{{ hexColor }}</span>
      </div>
      <div>
        RGB: <span class="font-mono font-semibold">{{ rgbColor }}</span>
      </div>
      <div>
        HSL: <span class="font-mono font-semibold">{{ hslColor }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { colord } from "colord";

  const color = ref("#3B82F6");
  const format = ref<ColorFormat>("hex");

  const hexColor = computed(() => colord(color.value).toHex());
  const rgbColor = computed(() => colord(color.value).toRgbString());
  const hslColor = computed(() => colord(color.value).toHslString());
</script>
```

<!-- /automd -->

::

### With Preset Swatches

Add preset color swatches for quick selection.

::ShowCase

:DocsColorPickerPresets

#code

<!-- automd:file src="../../app/components/content/Docs/ColorPicker/DocsColorPickerPresets.vue" code lang="vue" -->

```vue [DocsColorPickerPresets.vue]
<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" :show-presets="true" :presets="presetColors" />
    <div class="text-sm text-muted-foreground">
      Selected color: <span class="font-mono font-semibold">{{ color }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#3B82F6");

  const presetColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#10B981",
    "#14B8A6",
    "#06B6D4",
    "#0EA5E9",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#A855F7",
    "#D946EF",
    "#EC4899",
  ];
</script>
```

<!-- /automd -->

::

### Full Featured Showcase

See all features in action: alpha channel, format toggle, input field, and preset swatches.

::ShowCase

:DocsColorPickerShowcase

#code

<!-- automd:file src="../../app/components/content/Docs/ColorPicker/DocsColorPickerShowcase.vue" code lang="vue" -->

```vue [DocsColorPickerShowcase.vue]
<template>
  <div class="flex flex-col gap-6">
    <!-- Color Picker with all features -->
    <div class="space-y-2">
      <h3 class="text-sm font-semibold">Full Featured Color Picker</h3>
      <div class="rounded-lg border border-border bg-card p-4">
        <UiColorPicker
          v-model="selectedColor"
          :format="format"
          show-alpha
          show-format-toggle
          show-input
          show-presets
          :presets="presetColors"
          class="w-fit"
          @update:format="format = $event"
        />
      </div>
    </div>

    <!-- Display selected color details -->
    <div class="grid gap-4 sm:grid-cols-2">
      <!-- Color Information -->
      <UiCard>
        <UiCardContent class="space-y-3">
          <UiCardTitle class="text-sm font-semibold">Color Information</UiCardTitle>
          <div class="space-y-2 font-mono text-xs">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Current Format:</span>
              <span class="font-semibold uppercase">{{ format }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Value:</span>
              <span class="font-semibold">{{ selectedColor }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">HEX:</span>
              <span class="font-semibold">{{ hexValue }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">RGB:</span>
              <span class="font-semibold">{{ rgbValue }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">HSL:</span>
              <span class="font-semibold">{{ hslValue }}</span>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Large Color Preview -->
      <UiCard>
        <UiCardContent class="space-y-3">
          <UiCardTitle class="text-sm font-semibold">Preview</UiCardTitle>
          <div
            class="h-28 rounded-lg border-2 border-border shadow-md"
            :style="{
              backgroundColor: selectedColor,
              backgroundImage: hasAlpha
                ? `linear-gradient(${selectedColor}, ${selectedColor}), 
                 repeating-linear-gradient(45deg, #e5e7eb 0, #e5e7eb 2px, transparent 0, transparent 50%), 
                 repeating-linear-gradient(-45deg, #e5e7eb 0, #e5e7eb 2px, transparent 0, transparent 50%)`
                : 'none',
              backgroundSize: hasAlpha ? '100%, 8px 8px, 8px 8px' : 'auto',
              backgroundPosition: hasAlpha ? '0 0, 0 0, 4px 4px' : '0 0',
            }"
          ></div>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Preset Swatches Display -->
    <UiCard>
      <UiCardContent class="space-y-3">
        <UiCardTitle class="text-sm font-semibold">Available Presets</UiCardTitle>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(preset, index) in presetColors"
            :key="index"
            type="button"
            class="relative h-10 w-10 rounded-lg border-2 transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            :style="{ backgroundColor: preset }"
            :title="preset"
            @click="selectedColor = preset"
          >
            <span
              v-if="selectedColor === preset"
              class="absolute inset-0 flex items-center justify-center"
            >
              <Icon name="lucide:check" class="h-5 w-5 text-white drop-shadow" />
            </span>
          </button>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { colord } from "colord";

  const selectedColor = ref("#3B82F6");
  const format = ref<ColorFormat>("hex");

  const presetColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#10B981",
    "#14B8A6",
    "#06B6D4",
    "#0EA5E9",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#A855F7",
    "#D946EF",
    "#EC4899",
  ];

  // Computed properties for color format conversions
  const hexValue = computed(() => colord(selectedColor.value).toHex());
  const rgbValue = computed(() => colord(selectedColor.value).toRgbString());
  const hslValue = computed(() => colord(selectedColor.value).toHslString());
  const hasAlpha = computed(() => {
    const color = colord(selectedColor.value);
    return color.alpha() < 1;
  });
</script>
```

<!-- /automd -->

::

### In a Popover

Combine with a Popover for a compact color picker trigger.

::ShowCase

:DocsColorPickerPopover

#code

<!-- automd:file src="../../app/components/content/Docs/ColorPicker/DocsColorPickerPopover.vue" code lang="vue" -->

```vue [DocsColorPickerPopover.vue]
<template>
  <div class="flex items-center justify-center">
    <UiPopover>
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" class="w-fit justify-start gap-2 px-2">
          <div class="size-4 rounded border border-input" :style="{ backgroundColor: color }"></div>
          <span class="font-mono text-xs">{{ color }}</span>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-auto p-3" align="start">
        <UiColorPicker
          v-model="color"
          :show-alpha="true"
          :show-presets="true"
          :presets="presetColors"
        />
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#3B82F6");

  const presetColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#22C55E",
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];
</script>
```

<!-- /automd -->

::

## API

### Props

| Prop               | Type                               | Default     | Description                                                                             |
| ------------------ | ---------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `modelValue`       | `string`                           | `"#ff5733"` | The current color value. Accepts any valid color string supported by `colord`.          |
| `format`           | `"hex" \| "rgb" \| "hsl" \| "hsv"` | `"hex"`     | Output format used for `update:modelValue` and the input field display.                 |
| `showAlpha`        | `boolean`                          | `false`     | Enables alpha/opacity editing and forces HEX output to `#rrggbbaa` when `format="hex"`. |
| `showFormatToggle` | `boolean`                          | `true`      | Shows the format dropdown (`HEX/RGB/HSL/HSV`).                                          |
| `showInput`        | `boolean`                          | `true`      | Shows the text input that displays/accepts the current color string.                    |
| `showPresets`      | `boolean`                          | `false`     | Shows preset swatches.                                                                  |
| `presets`          | `string[]`                         | `[]`        | List of preset colors.                                                                  |
| `class`            | `HTMLAttributes["class"]`          | `undefined` | Additional classes for the root wrapper.                                                |

### Events

| Event               | Payload                                      | Description                                                                                                                                                                              |
| ------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `update:modelValue` | `(value: string)`                            | Fired whenever the internal color changes. The emitted string matches the selected `format`. If `showAlpha` is enabled and `format="hex"`, the output is always `#rrggbbaa` (lowercase). |
| `update:format`     | `(format: "hex" \| "rgb" \| "hsl" \| "hsv")` | Fired when the format selection changes. Supports `v-model:format`.                                                                                                                      |

### Slots

| Slot       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `top`      | Content rendered above the main UI.                     |
| `sv`       | Replace the default SV (saturation/value) component.    |
| `hue`      | Replace the default hue slider component.               |
| `alpha`    | Replace the default alpha slider component.             |
| `controls` | Replace preview + format + input area.                  |
| `presets`  | Replace preset swatches area.                           |
| `default`  | Rendered at the bottom inside the root (after presets). |

## Dependencies

This component uses the [colord](https://www.npmjs.com/package/colord) library for color parsing and conversion between different formats.
