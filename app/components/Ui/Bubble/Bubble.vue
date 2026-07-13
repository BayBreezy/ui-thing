<template>
  <Primitive
    data-slot="bubble"
    :data-variant="variant"
    :data-align="align"
    v-bind="forwarded"
    :class="bubbleStyles({ variant, class: normalizeClass(props.class) || undefined })"
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

  export const bubbleStyles = tv({
    base: "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        muted:
          "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
        tinted:
          "*:data-[slot=bubble-content]:text-foreground *:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] dark:*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]",
        outline:
          "*:data-[slot=bubble-content]:bg-background *:data-[slot=bubble-content]:border-border [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
        ghost:
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50 border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0",
        destructive:
          "*:data-[slot=bubble-content]:bg-destructive/10 dark:*:data-[slot=bubble-content]:bg-destructive/20 *:data-[slot=bubble-content]:text-destructive [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  export type BubbleVariants = VariantProps<typeof bubbleStyles>;

  export type BubbleProps = PrimitiveProps & {
    /**
     * The bubble visual treatment.
     *
     * @default "default"
     */
    variant?: BubbleVariants["variant"];
    /**
     * The inline alignment of the bubble.
     *
     * @default "start"
     */
    align?: "start" | "end";
    /** Additional classes to apply to the root element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BubbleProps>(), {
    variant: "default",
    align: "start",
  });

  const forwarded = reactiveOmit(props, ["variant", "align", "class"]);
</script>
