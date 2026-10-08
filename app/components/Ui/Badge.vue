<template>
  <component
    :is="elementType"
    :class="
      badgeVariants({
        disabled,
        size,
        variant,
        shape,
        class: [colorClass, normalizeClass(props.class) || undefined],
      })
    "
    v-bind="forwarded"
    @click="onClick"
  >
    <slot name="leading">
      <span
        v-if="showDot"
        data-slot="badge-dot"
        :class="['shrink-0 rounded-full', sizes.dot, badgeColorClasses[color ?? 'gray'].dot]"
      />
      <img
        v-else-if="avatar"
        :src="avatar"
        alt=""
        data-slot="badge-avatar"
        :class="['shrink-0 rounded-full object-cover', sizes.avatar]"
      />
      <Icon v-else-if="icon" :name="icon" />
    </slot>
    <slot />
    <slot name="trailing">
      <Icon v-if="trailingIcon" :name="trailingIcon" />
    </slot>
  </component>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { NuxtLinkProps } from "#app/components";
  import { badgeColorClasses } from "~/utils/badge-colors";
  import type { BadgeColor } from "~/utils/badge-colors";
</script>

<script lang="ts" setup>
  // `rounded-md` is part of the `shape` variant. The colored variants (`soft`, `solid`, `modern`
  // and `outline` with a `color`) get their colors from `badgeColorClasses`.
  const badgeVariants = tv({
    base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
        destructive:
          "bg-destructive focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90 border-transparent text-white",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-green-500 text-white focus-visible:ring-green-500/20 dark:bg-green-500/60 dark:focus-visible:ring-green-500/40 [a&]:hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white focus-visible:ring-yellow-500/20 dark:bg-yellow-500/60 dark:focus-visible:ring-yellow-500/40 [a&]:hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white focus-visible:ring-blue-500/20 dark:bg-blue-500/60 dark:focus-visible:ring-blue-500/40 [a&]:hover:bg-blue-600",
        ghost: "text-foreground [a&]:hover:bg-accent/50 border-transparent bg-transparent",
        error:
          "border-transparent bg-red-500 text-white focus-visible:ring-red-500/20 dark:bg-red-500/60 dark:focus-visible:ring-red-500/40 [a&]:hover:bg-red-600",
        soft: "border-transparent ring-1 ring-inset [a&]:hover:brightness-95 dark:[a&]:hover:brightness-125 [button&]:hover:brightness-95 dark:[button&]:hover:brightness-125",
        solid:
          "border-transparent ring-1 ring-inset [a&]:hover:brightness-95 dark:[a&]:hover:brightness-125 [button&]:hover:brightness-95 dark:[button&]:hover:brightness-125",
        modern:
          "bg-background text-foreground ring-border dark:bg-input/30 border-transparent shadow-xs ring-1 ring-inset [a&]:hover:brightness-95 dark:[a&]:hover:brightness-125 [button&]:hover:brightness-95 dark:[button&]:hover:brightness-125",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      size: {
        sm: "px-2 py-0.5 text-xs font-medium",
        md: "px-2.5 py-[3px] text-sm font-medium",
        lg: "px-2.5 py-1 text-sm font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      disabled: false,
      size: "sm",
    },
  });

  type BadgeProps = VariantProps<typeof badgeVariants>;

  const props = defineProps<
    NuxtLinkProps & {
      /** Any additional class that should be added to the badge. */
      class?: HTMLAttributes["class"];
      /**
       * The variant of the badge. Use `soft`, `solid`, `outline` or `modern` together with `color`
       * for colored badges.
       */
      variant?: BadgeProps["variant"];
      /**
       * The color of the `soft`, `solid` and `outline` variants. The `modern` variant is neutral
       * and uses the color for its dot. Defaults to `gray` for `soft`, `solid` and `modern`.
       */
      color?: BadgeColor;
      /** The size of the badge. */
      size?: BadgeProps["size"];
      /** The shape of the badge. */
      shape?: BadgeProps["shape"];
      /** Icon shown before the text. */
      icon?: string;
      /** Icon shown after the text. */
      trailingIcon?: string;
      /**
       * Show a colored dot before the text. The `modern` variant shows one unless an icon or avatar
       * is set.
       */
      dot?: boolean;
      /** Image shown before the text. */
      avatar?: string;
      /** The action to perform when the badge is clicked. */
      onClick?: () => void;
      /** Should the badge be disabled or not. */
      disabled?: boolean;
      /** The element to render the badge as. */
      tag?: string;
    }
  >();

  const forwarded = useForwardProps(
    reactiveOmit(
      props,
      "class",
      "variant",
      "color",
      "shape",
      "icon",
      "trailingIcon",
      "dot",
      "avatar",
      "onClick",
      "disabled"
    )
  );

  const elementType = computed(() => {
    if (props.tag) return props.tag;
    if (props.href || props.to) return resolveComponent("NuxtLink");
    if (props.onClick) return "button";
    return props.tag || "div";
  });

  const colorClass = computed(() => {
    const color = props.color ?? "gray";
    if (props.variant === "soft") return badgeColorClasses[color].soft;
    if (props.variant === "solid") return badgeColorClasses[color].solid;
    // The neutral outline stays as it was unless a color is chosen
    if (props.variant === "outline" && props.color)
      return ["border-transparent ring-1 ring-inset", badgeColorClasses[props.color].outline];
    return undefined;
  });

  const showDot = computed(
    () => props.dot || (props.variant === "modern" && !props.avatar && !props.icon)
  );

  const sizes = computed(
    () =>
      ({
        sm: { dot: "size-1.5", avatar: "size-3.5" },
        md: { dot: "size-2", avatar: "size-4" },
        lg: { dot: "size-2", avatar: "size-5" },
      })[props.size ?? "sm"]
  );
</script>
