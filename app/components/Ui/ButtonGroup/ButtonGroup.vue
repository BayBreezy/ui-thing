<template>
  <Primitive
    v-bind="forwarded"
    role="group"
    data-slot="button-group"
    :data-orientation="orientation"
    :class="buttonGroupVariants({ orientation, class: props.class })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  export const buttonGroupVariants = tv({
    base: "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  });

  export type ButtonGroupProps = PrimitiveProps & {
    /**
     * The orientation of the button group.
     * @default 'horizontal'
     */
    orientation?: VariantProps<typeof buttonGroupVariants>["orientation"];
    /**
     * Additional classes to apply to the button group.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<ButtonGroupProps>(), {
    orientation: "horizontal",
  });

  const forwarded = reactiveOmit(props, ["orientation", "class"]);
</script>
