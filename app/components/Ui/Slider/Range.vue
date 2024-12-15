<template>
  <SliderRange :class="styles({ class: props.class })" v-bind="forwarded">
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
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
  });
</script>
