<template>
  <SliderTrack
    data-slot="slider-track"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </SliderTrack>
</template>

<script lang="ts" setup>
  import { SliderTrack } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { SliderTrackProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SliderTrackProps & {
      /** Custom class(es) to add to parent element */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
  });
</script>
