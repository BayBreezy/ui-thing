<template>
  <Primitive
    data-slot="marker-icon"
    aria-hidden="true"
    v-bind="forwarded"
    :class="markerIconStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const markerIconStyles = tv({
    base: "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });

  export type MarkerIconProps = PrimitiveProps & {
    /** Additional classes to apply to the icon slot. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MarkerIconProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
