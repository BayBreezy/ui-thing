<template>
  <div class="relative inline-flex flex-shrink-0 items-center justify-center">
    <slot />
    <TransitionScale>
      <span
        v-if="localModel"
        :class="[styles({ position, size, inset, class: [props.color, props.class] })]"
      >
        <slot name="content">
          {{ text }}
        </slot>
      </span>
    </TransitionScale>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<{
      /**
       * The text to display in the chip.
       *
       * Can be overridden by the `content` slot.
       */
      text?: string;
      /**
       * The color of the chip.
       *
       * @default `bg-primary`
       */
      color?: string;
      /**
       * The size of the chip.
       *
       * @default `sm`
       */
      size?: VariantProps<typeof styles>["size"];
      /**
       * The position of the chip.
       *
       * @default `top-right`
       */
      position?: VariantProps<typeof styles>["position"];
      /**
       * Whether the chip should be inset.
       *
       * @default `false`
       */
      inset?: boolean;
      /**
       * Whether the chip should be visible.
       *
       * Can be used with `v-model` to control visibility.
       *
       * @default `true`
       */
      show?: boolean;
      /**
       * Additional classes to apply to the chip.
       */
      class?: any;
    }>(),
    { show: true, color: "bg-primary", inset: false }
  );

  const localModel = defineModel<boolean>("show", { default: true });

  const styles = tv({
    base: "absolute flex items-center justify-center whitespace-nowrap rounded-full font-medium text-foreground ring-[2px] ring-background",
    variants: {
      position: {
        "top-right": "right-0 top-0",
        "bottom-right": "bottom-0 right-0",
        "top-left": "left-0 top-0",
        "bottom-left": "bottom-0 left-0",
      },
      inset: {
        true: "",
        false: "",
      },
      size: {
        "3xs": "h-[4px] min-w-[4px] p-px text-[4px]",
        "2xs": "h-[5px] min-w-[5px] p-px text-[5px]",
        xs: "h-1.5 min-w-[0.375rem] p-px text-[6px]",
        sm: "h-2 min-w-[0.5rem] p-0.5 text-[7px]",
        md: "h-2.5 min-w-2.5 p-0.5 text-[8px]",
        lg: "h-3 min-w-[0.75rem] p-0.5 text-[10px]",
        xl: "h-3.5 min-w-[0.875rem] p-1 text-[11px]",
        "2xl": "h-4 min-w-[1rem] p-1 text-[12px]",
        "3xl": "h-5 min-w-[1.25rem] p-1 text-[14px]",
      },
    },
    defaultVariants: {
      size: "sm",
      position: "top-right",
      inset: false,
    },
    compoundVariants: [
      {
        inset: false,
        position: "top-right",
        class: "-translate-y-1/2 translate-x-1/2 transform",
      },
      {
        inset: false,
        position: "bottom-right",
        class: "-translate-x-1/2 translate-y-1/2 transform",
      },
      {
        inset: false,
        position: "top-left",
        class: "-translate-x-1/2 -translate-y-1/2 transform",
      },
      {
        inset: false,
        position: "bottom-left",
        class: "-translate-x-1/2 translate-y-1/2 transform",
      },
    ],
  });
</script>
