<template>
  <Primitive
    data-sidebar="group-action"
    :as="as"
    :as-child="asChild"
    :class="sideBarGroupActionStyles({ class: props.class })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarGroupActionStyles = tv({
    base: "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 group-data-[collapsible=icon]:hidden after:md:hidden [&>svg]:size-4 [&>svg]:shrink-0",
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
</script>
