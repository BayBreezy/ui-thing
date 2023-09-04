<template>
  <SliderRoot
    :as-child="asChild"
    :name="name"
    :defaultValue="defaultValue"
    :modelValue="modelValue"
    :disabled="disabled"
    :orientation="orientation"
    :dir="dir"
    :inverted="inverted"
    :min="min"
    :max="max"
    :step="step"
    :minStepsBetweenThumbs="minStepsBetweenThumbs"
    :class="styles({ class: props.class })"
    @update:modelValue="($event) => $emit('update:modelValue', $event)"
    @valueCommit="($event) => $emit('valueCommit', $event)"
  >
    <slot>
      <slot name="track">
        <UISliderTrack>
          <slot name="range">
            <UISliderRange />
          </slot>
        </UISliderTrack>
      </slot>
      <slot name="thumb">
        <UISliderThumb v-for="(t, i) in modelValue.length" :key="i" />
      </slot>
    </slot>
  </SliderRoot>
</template>

<script lang="ts" setup>
  import { DataOrientation, Direction } from "radix-vue/dist/shared/types";

  const props = withDefaults(
    defineProps<{
      name?: string;
      defaultValue?: number[];
      modelValue?: number[];
      disabled?: boolean;
      orientation?: DataOrientation;
      dir?: Direction;
      inverted?: boolean;
      min?: number;
      max?: number;
      step?: number;
      minStepsBetweenThumbs?: number;
      asChild?: boolean;
      class?: any;
    }>(),
    {
      orientation: "horizontal",
      min: 0,
      max: 100,
      modelValue: () => [0],
    }
  );

  const emits = defineEmits<{
    "update:modelValue": [payload: number[] | undefined];
    valueCommit: [payload: number[]];
  }>();

  const styles = tv({
    base: "relative flex w-full touch-none select-none items-center",
  });
</script>
