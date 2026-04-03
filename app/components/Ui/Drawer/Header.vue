<template>
  <Primitive
    data-slot="drawer-header"
    v-bind="forwarded"
    :class="drawerHeaderStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const drawerHeaderStyles = tv({
    base: "grid gap-1.5 p-4 text-center sm:text-left",
  });

  export type DrawerHeaderProps = PrimitiveProps & {
    /**
     * Classes to add to the header.
     */
    class?: HTMLAttributes["class"];
  };
</script>
<script lang="ts" setup>
  const props = withDefaults(defineProps<DrawerHeaderProps>(), {
    as: "div",
  });
  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
