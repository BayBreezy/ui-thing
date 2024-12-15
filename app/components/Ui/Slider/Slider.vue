<template>
  <SliderRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot :props="props">
      <slot name="track" :props="props">
        <UiSliderTrack>
          <slot name="range" :props="props">
            <UiSliderRange />
          </slot>
        </UiSliderTrack>
      </slot>
      <slot name="thumb" :props="props">
        <UiSliderThumb v-for="(t, i) in modelValue.length" :key="i" />
      </slot>
    </slot>
  </SliderRoot>
</template>

<script lang="ts" setup>
  import { SliderRoot, useForwardPropsEmits } from "radix-vue";
  import type { SliderRootEmits, SliderRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      SliderRootProps & {
        /** Custom class(es) to add to parent element */
        class?: any;
      }
    >(),
    {
      orientation: "horizontal",
      min: 0,
      step: 1,
      max: 100,
      modelValue: () => [0],
    }
  );

  const emits = defineEmits<SliderRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "relative flex w-full touch-none select-none items-center",
  });
</script>
