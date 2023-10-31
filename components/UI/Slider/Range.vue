<template>
  <SliderRange :class="styles({ class: props.class })" v-bind="props">
    <slot></slot>
  </SliderRange>
</template>

<script lang="ts" setup>
  import { SliderRange } from "radix-vue";
  import type { SliderRangeProps } from "radix-vue";

  const props = defineProps<
    SliderRangeProps & {
      class?: any;
    }
  >();
  const styles = tv({
    base: "absolute h-full bg-primary",
  });
</script>
