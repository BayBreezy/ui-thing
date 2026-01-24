<template>
  <UiColorPickerRoot
    v-bind="props"
    @update:model-value="(v) => emit('update:modelValue', v)"
    @update:format="(f) => emit('update:format', f)"
  >
    <slot name="top" />

    <div class="flex gap-3">
      <slot name="sv">
        <UiColorPickerSV />
      </slot>

      <slot name="hue">
        <UiColorPickerHue />
      </slot>
    </div>

    <slot name="alpha">
      <UiColorPickerAlpha v-if="props.showAlpha" class="mt-3" />
    </slot>

    <slot name="controls">
      <UiColorPickerControls />
    </slot>

    <slot name="presets">
      <UiColorPickerPresets />
    </slot>

    <slot />
  </UiColorPickerRoot>
</template>

<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      format?: ColorFormat;
      showAlpha?: boolean;
      showFormatToggle?: boolean;
      showInput?: boolean;
      showPresets?: boolean;
      presets?: string[];
      class?: HTMLAttributes["class"];
    }>(),
    {
      modelValue: "#ff5733",
      format: "hex",
      showAlpha: false,
      showFormatToggle: true,
      showInput: true,
      showPresets: false,
      presets: () => [],
    }
  );

  const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:format": [format: ColorFormat];
  }>();
</script>
