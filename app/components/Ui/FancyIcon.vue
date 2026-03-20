<template>
  <div
    data-slot="fancy-icon"
    :class="styles({ class: normalizeClass(props.class) || undefined, color, size, theme })"
  >
    <slot>
      <Icon v-if="icon" data-slot="fancy-icon-icon" :name="icon" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      /**
       * Custom class(es) to add to the icon container.
       */
      class?: HTMLAttributes["class"];
      /**
       * The icon to display.
       */
      icon?: string;
      /**
       * The color variant of the icon.
       */
      color?: VariantProps<typeof styles>["color"];
      /**
       * The theme variant of the icon.
       */
      theme?: VariantProps<typeof styles>["theme"];
      /**
       * The size variant of the icon.
       */
      size?: VariantProps<typeof styles>["size"];
    }>(),
    {
      color: "primary",
      theme: "modern",
      size: "lg",
    }
  );

  const styles = tv({
    base: "relative flex shrink-0 items-center justify-center",
    variants: {
      theme: {
        light: "rounded-full",
        gradient:
          "rounded-full text-white *:z-10 before:absolute before:inset-0 before:size-full before:rounded-full before:border before:mask-b-from-0% after:absolute after:block after:rounded-full",
        dark: "text-white before:absolute before:inset-px before:border before:border-white/10 before:mask-b-from-0%",
        modern: "bg-background ring-1 ring-inset",
        "modern-neue": [
          "ring-1 ring-inset before:absolute before:inset-1 dark:bg-muted/40",
          "before:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_3px_3px_0px_rgba(0,0,0,0.09),1px_8px_5px_0px_rgba(0,0,0,0.05),2px_21px_6px_0px_rgba(0,0,0,0),0px_0px_0px_1px_rgba(0,0,0,0.08),1px_13px_5px_0px_rgba(0,0,0,0.01),0px_-2px_2px_0px_rgba(0,0,0,0.13)_inset] before:ring-1 before:ring-border",
        ],
        outline:
          "before:absolute before:rounded-full before:border-2 after:absolute after:rounded-full after:border-2",
      },
      size: {
        sm: "*:size-4",
        md: "*:size-5",
        lg: "*:size-6",
        xl: "*:size-7",
      },
      color: {
        primary: "",
        gray: "",
        error: "",
        warning: "",
        success: "",
        info: "",
      },
    },

    compoundVariants: [
      // Apply shadow to dark and modern
      {
        theme: ["dark", "modern"],
        class:
          "shadow-[0px_0px_0px_1px_rgba(10,13,18,0.18)_inset,0px_-2px_0px_0px_rgba(10,13,18,0.05)_inset,0px_1px_2px_rgba(10,13,18,0.05)]",
      },
      // Light sizes
      { theme: "light", size: "sm", class: "size-8" },
      { theme: "light", size: "md", class: "size-10" },
      { theme: "light", size: "lg", class: "size-12" },
      { theme: "light", size: "xl", class: "size-14" },
      // Light colors
      {
        theme: "light",
        color: "primary",
        class: "bg-primary/10 text-primary dark:bg-primary dark:text-primary-foreground",
      },
      { theme: "light", color: "gray", class: "bg-muted text-muted-foreground" },
      {
        theme: "light",
        color: "error",
        class: "bg-red-500/10 text-red-500 dark:bg-red-500 dark:text-white",
      },
      {
        theme: "light",
        color: "warning",
        class: "bg-amber-500/10 text-amber-500 dark:bg-amber-500 dark:text-white",
      },
      {
        theme: "light",
        color: "success",
        class: "bg-green-500/10 text-green-500 dark:bg-green-500 dark:text-white",
      },
      {
        theme: "light",
        color: "info",
        class: "bg-blue-500/10 text-blue-500 dark:bg-blue-500 dark:text-white",
      },
      // Gradient sizes
      { theme: "gradient", size: "sm", class: "size-8 after:size-6 [*>svg]:size-4" },
      { theme: "gradient", size: "md", class: "size-10 after:size-7 [*>svg]:size-4" },
      { theme: "gradient", size: "lg", class: "size-12 after:size-8 [*>svg]:size-5" },
      { theme: "gradient", size: "xl", class: "size-14 after:size-10 [*>svg]:size-5" },
      // Gradient colors
      {
        theme: "gradient",
        color: "primary",
        class:
          "before:border-primary/40 before:bg-primary/10 before:text-white after:bg-primary after:text-white",
      },
      {
        theme: "gradient",
        color: "gray",
        class:
          "before:border-gray-700/20 before:bg-gray-700/10 after:bg-gray-700 dark:before:bg-gray-700/50",
      },
      {
        theme: "gradient",
        color: "error",
        class: "before:border-red-800/20 before:bg-red-500/10 after:bg-red-500",
      },
      {
        theme: "gradient",
        color: "warning",
        class: "before:border-amber-800/20 before:bg-amber-500/10 after:bg-amber-500",
      },
      {
        theme: "gradient",
        color: "success",
        class: "before:border-green-800/20 before:bg-green-500/10 after:bg-green-500",
      },
      {
        theme: "gradient",
        color: "info",
        class: "before:border-blue-800/20 before:bg-blue-500/10 after:bg-blue-500",
      },
      // Dark sizes
      { theme: "dark", size: "sm", class: "size-8 rounded-md before:rounded-[5px]" },
      { theme: "dark", size: "md", class: "size-10 rounded-lg before:rounded-[7px]" },
      { theme: "dark", size: "lg", class: "size-12 rounded-[10px] before:rounded-[9px]" },
      { theme: "dark", size: "xl", class: "size-14 rounded-xl before:rounded-[11px]" },
      // Dark colors
      { theme: "dark", color: "primary", class: "bg-primary before:border-primary/12" },
      {
        theme: "dark",
        color: "gray",
        class: "bg-gray-800/80 before:border-muted/12 dark:bg-gray-700",
      },
      { theme: "dark", color: "error", class: "bg-red-500 before:border-red-800/12" },
      {
        theme: "dark",
        color: "warning",
        class: "bg-amber-500 before:border-amber-800/12",
      },
      {
        theme: "dark",
        color: "success",
        class: "bg-green-500 before:border-green-800/12",
      },
      {
        theme: "dark",
        color: "info",
        class: "bg-blue-500 before:border-blue-800/12",
      },
      // Modern sizes
      { theme: "modern", size: "sm", class: "size-8 rounded-md" },
      { theme: "modern", size: "md", class: "size-10 rounded-lg" },
      { theme: "modern", size: "lg", class: "size-12 rounded-[10px]" },
      { theme: "modern", size: "xl", class: "size-14 rounded-xl" },
      // Modern colors
      {
        theme: "modern",
        class: "text-foreground ring-border",
      },
      // Modern Neue sizes
      { theme: "modern-neue", size: "sm", class: "size-8 rounded-[8px] before:rounded-[4px]" },
      { theme: "modern-neue", size: "md", class: "size-10 rounded-[10px] before:rounded-[6px]" },
      { theme: "modern-neue", size: "lg", class: "size-12 rounded-[12px] before:rounded-[8px]" },
      { theme: "modern-neue", size: "xl", class: "size-14 rounded-[14px] before:rounded-[10px]" },
      // Modern Neue colors
      {
        theme: "modern-neue",
        class: "text-foreground ring-border",
      },
      // Outline sizes
      { theme: "outline", size: "sm", class: "size-4 before:size-6 after:size-8.5" },
      { theme: "outline", size: "md", class: "size-5 before:size-7 after:size-9.5" },
      { theme: "outline", size: "lg", class: "size-6 before:size-8 after:size-10.5" },
      { theme: "outline", size: "xl", class: "size-7 before:size-9 after:size-11.5" },
      // Outline colors
      {
        theme: "outline",
        color: "primary",
        class: "text-primary before:border-primary/30 after:border-primary/10",
      },
      {
        theme: "outline",
        color: "gray",
        class:
          "text-muted-foreground before:border-muted-foreground/30 after:border-muted-foreground/10",
      },
      {
        theme: "outline",
        color: "error",
        class: "text-red-500 before:border-red-500/30 after:border-red-500/10",
      },
      {
        theme: "outline",
        color: "warning",
        class: "text-amber-500 before:border-amber-500/30 after:border-amber-500/10",
      },
      {
        theme: "outline",
        color: "success",
        class: "text-green-500 before:border-green-500/30 after:border-green-500/10",
      },
      {
        theme: "outline",
        color: "info",
        class: "text-blue-500 before:border-blue-500/30 after:border-blue-500/10",
      },
    ],
    defaultVariants: { theme: "light", size: "md", color: "primary" },
  });
</script>
