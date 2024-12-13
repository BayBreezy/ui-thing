<template>
  <Primitive v-bind="forwarded" :class="drawerFooterStyles({ class: props.class })">
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  export const drawerFooterStyles = tv({
    base: "mt-auto flex flex-col gap-2 p-4",
  });

  export type DrawerHeaderProps = PrimitiveProps & {
    /**
     * Classes to add to the parent.
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
