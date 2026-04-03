<template>
  <Primitive
    data-slot="kbd"
    :class="styles({ size, variant, class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>
<script setup lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /**
         * The size of the component
         * @default "sm"
         * */
        size?: VariantProps<typeof styles>["size"];
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
        /**
         * The variant of the component
         * @default "solid"
         * */
        variant?: VariantProps<typeof styles>["variant"];
      }
    >(),
    {
      as: "kbd",
      size: "sm",
    }
  );

  const forwarded = reactiveOmit(props, "class", "size");

  const styles = tv({
    base: [
      "pointer-events-none inline-flex w-fit min-w-5 items-center justify-center gap-1 rounded-sm font-sans font-medium select-none",
      "[&_svg:not([class*='size-'])]:size-3",
    ],
    variants: {
      size: {
        xs: "h-4 px-1 text-[11px]",
        sm: "h-5 px-1 text-xs",
        md: "h-[22px] px-1 text-sm",
      },
      variant: {
        solid: "bg-muted text-foreground/80",
        outline: "border bg-transparent",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "solid",
    },
  });
</script>
