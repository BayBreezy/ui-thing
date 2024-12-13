<template>
  <Primitive v-bind="forwarded" :class="drawerHeaderStyles({ class: props.class })">
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  export const drawerHeaderStyles = tv({
    base: "grid gap-1.5 p-4 text-center sm:text-left",
  });

  export type DrawerHeaderProps = PrimitiveProps & {
    /**
     * Classes to add to the header.
     */
    class?: any;
  };
</script>
<script lang="ts" setup>
  const props = withDefaults(defineProps<DrawerHeaderProps>(), {
    as: "div",
  });
  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
