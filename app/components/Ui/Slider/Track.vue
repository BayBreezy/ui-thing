<template>
  <SliderTrack :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </SliderTrack>
</template>

<script lang="ts" setup>
  import { SliderTrack } from "radix-vue";
  import type { SliderTrackProps } from "radix-vue";

  const props = defineProps<
    SliderTrackProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "relative grow overflow-hidden rounded-full bg-secondary data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2",
  });
</script>
