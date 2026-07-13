<template>
  <Primitive
    data-slot="bubble-reactions"
    :data-side="side"
    :data-align="align"
    v-bind="forwarded"
    :class="bubbleReactionsStyles({ side, align, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const bubbleReactionsStyles = tv({
    base: "ring-card bg-muted absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-1.5 py-0.5 text-sm ring-3 has-[button]:p-0",
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  });

  export type BubbleReactionsVariants = VariantProps<typeof bubbleReactionsStyles>;

  export type BubbleReactionsProps = PrimitiveProps & {
    /**
     * The side of the bubble to anchor the reactions.
     *
     * @default "bottom"
     */
    side?: BubbleReactionsVariants["side"];
    /**
     * The inline alignment of the reactions.
     *
     * @default "end"
     */
    align?: BubbleReactionsVariants["align"];
    /** Additional classes to apply to the reaction row. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BubbleReactionsProps>(), {
    side: "bottom",
    align: "end",
  });

  const forwarded = reactiveOmit(props, ["side", "align", "class"]);
</script>
