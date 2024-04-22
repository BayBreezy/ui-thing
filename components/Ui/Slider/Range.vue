<template>
  <SliderRange :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </SliderRange>
</template>

<script lang="ts" setup>
  import { SliderRange } from "radix-vue";
  import type { SliderRangeProps } from "radix-vue";

  const props = defineProps<
    SliderRangeProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();
  const styles = tv({
    base: "absolute h-full bg-primary",
  });
</script>
