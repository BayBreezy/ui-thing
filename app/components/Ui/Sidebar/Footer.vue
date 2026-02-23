<template>
  <Primitive
    data-slot="sidebar-footer"
    data-sidebar="footer"
    :class="sideBarFooterStyles({ class: props.class })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive, useForwardProps } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const sideBarFooterStyles = tv({
    base: "flex flex-col gap-2 p-2",
  });
</script>
<script setup lang="ts">
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to apply to the parent element.
       */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
