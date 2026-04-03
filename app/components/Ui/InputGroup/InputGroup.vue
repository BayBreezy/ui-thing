<template>
  <Primitive
    v-bind="props"
    data-slot="input-group"
    role="group"
    :class="inputGroupStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const inputGroupStyles = tv({
    base: [
      "group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
      "h-9 has-[>textarea]:h-auto",
      // Variants based on alignment.
      "has-[>[data-align=inline-start]]:[&>input]:pl-2",
      "has-[>[data-align=inline-end]]:[&>input]:pr-2",
      "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
      "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
      // Focus state.
      "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",
      // Error state.
      "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
    ],
  });
</script>

<script lang="ts" setup>
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to apply to the input group container.
       */
      class?: HTMLAttributes["class"];
    }
  >();
</script>
