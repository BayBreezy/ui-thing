<template>
  <SliderRoot v-bind="forwarded" :class="styles({ class: props.class })">
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
  import { SliderRoot, useForwardPropsEmits } from "radix-vue";
  import type { SliderRootEmits, SliderRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      SliderRootProps & {
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
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "relative flex w-full touch-none select-none items-center",
  });
</script>
