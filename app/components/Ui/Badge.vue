<template>
  <component
    :is="elementType"
    :class="badgeVariants({ disabled, size, variant, class: props.class })"
    v-bind="forwarded"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { useForwardProps } from "radix-vue";
  import type { NuxtLinkProps } from "#app/components";
</script>
<script lang="ts" setup>
  const badgeVariants = tv({
    base: "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs font-medium",
        md: "px-2.5 py-1 text-sm font-semibold",
        lg: "px-3 py-1.5 text-sm font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
      size: "sm",
    },
  });

  type BadgeProps = VariantProps<typeof badgeVariants>;

  const props = defineProps<
    NuxtLinkProps & {
      /** Any additional class that should be added to the badge */
      class?: any;
      /** The variant of the badge */
      variant?: BadgeProps["variant"];
      /** The size of the badge */
      size?: BadgeProps["size"];
      /** The action to perform when the badge is clicked */
      onClick?: () => void;
      /** Should the badge be disabled or not */
      disabled?: boolean;
      /** The element to render the badge as */
      tag?: string;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class", "variant", "onClick", "disabled"));

  const elementType = computed(() => {
    if (props.tag) return props.tag;
    if (props.href || props.to) return resolveComponent("NuxtLink");
    if (props.onClick) return "button";
    return props.tag || "div";
  });
</script>
