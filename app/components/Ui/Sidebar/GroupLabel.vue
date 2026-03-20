<template>
  <Primitive
    data-sidebar="group-label"
    data-slot="sidebar-group-label"
    :as="as"
    :as-child="asChild"
    :class="sideBarGroupLabelStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ props.label }}</slot>
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const sideBarGroupLabelStyles = tv({
    base: "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
  });
</script>
<script setup lang="ts">
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to apply to the parent element.
       */
      class?: HTMLAttributes["class"];
      /**
       * The label for the group.
       */
      label?: string;
    }
  >();
</script>
