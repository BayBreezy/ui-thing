<template>
  <SliderRange
    data-slot="slider-range"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </SliderRange>
</template>

<script lang="ts" setup>
  import { SliderRange } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { SliderRangeProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SliderRangeProps & {
      /** Custom class(es) to add to parent element */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
  });
</script>
