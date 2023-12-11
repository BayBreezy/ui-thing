<template>
  <Primitive
    :class="styles({ size, class: props.class })"
    v-bind="reactiveOmit(props, 'class', 'size')"
  >
    <slot />
  </Primitive>
</template>
<script setup lang="ts">
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** The size of the component */
        size?: VariantProps<typeof styles>["size"];
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      as: "kbd",
      size: "sm",
    }
  );

  const styles = tv({
    base: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-border bg-muted font-sans font-medium",
    variants: {
      size: {
        xs: "h-5 min-h-[16px] px-1 text-[10px]",
        sm: "h-6 min-h-[20px] px-1.5 text-[11px]",
        md: "h-7 min-h-[24px] px-2 text-[12px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  });
</script>
