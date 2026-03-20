<template>
  <Primitive
    data-slot="item"
    :data-variant="variant"
    :data-size="size"
    v-bind="forwarded"
    :class="itemStyles({ variant, size, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  export const itemStyles = tv({
    base: "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",

    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  export type ItemProps = PrimitiveProps & {
    /**
     * The variant of the item.
     * @default 'default'
     */
    variant?: VariantProps<typeof itemStyles>["variant"];
    /**
     * The size of the item.
     * @default 'default'
     */
    size?: VariantProps<typeof itemStyles>["size"];
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ItemProps>(), {
    variant: "default",
    size: "default",
  });

  const forwarded = reactiveOmit(props, ["variant", "size", "class"]);
</script>
