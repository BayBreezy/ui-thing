<template>
  <Primitive
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    :class="sideBarGroupLabelStyles({ class: props.class })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarGroupLabelStyles = tv({
    base: "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 [&>svg]:size-4 [&>svg]:shrink-0",
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
