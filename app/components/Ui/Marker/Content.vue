<template>
  <Primitive
    data-slot="marker-content"
    v-bind="forwarded"
    :class="markerContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const markerContentStyles = tv({
    base: "*:[a]:hover:text-foreground min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3",
  });

  export type MarkerContentProps = PrimitiveProps & {
    /** Additional classes to apply to the content slot. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MarkerContentProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, ["class"]);
</script>
