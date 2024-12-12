<template>
  <div :class="styles().base({ class: props.class, color, type, size, circle })">
    <slot :styles="styles().icon({ color, type, size, circle })">
      <Icon v-if="icon" :name="icon" :class="styles().icon({ color, type, size, circle })" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      icon?: string;
      color?: VariantProps<typeof styles>["color"];
      type?: VariantProps<typeof styles>["type"];
      size?: VariantProps<typeof styles>["size"];
      circle?: boolean;
    }>(),
    {
      color: "primary",
      type: "modern",
      size: "lg",
      circle: false,
    }
  );

  const styles = tv({
    slots: {
      base: "flex shrink-0 items-center justify-center",
      icon: "",
    },

    variants: {
      color: {
        primary: {
          base: "",
          icon: "",
        },
        success: {
          base: "",
          icon: "",
        },
        warning: {
          base: "",
          icon: "",
        },
        error: {
          base: "",
          icon: "",
        },
        info: {
          base: "",
          icon: "",
        },
      },
      type: {
        light: {
          base: "",
          icon: "",
        },
        dark: {
          base: "",
          icon: "",
        },
        modern: {
          base: "",
          icon: "",
        },
      },
      size: {
        sm: {
          base: "size-8",
          icon: "size-4",
        },
        md: {
          base: "size-10",
          icon: "size-5",
        },
        lg: {
          base: "size-12",
          icon: "size-6",
        },
        xl: {
          base: "size-14",
          icon: "size-7",
        },
      },
      circle: {
        true: {
          base: "rounded-full",
        },
        false: {
          base: "rounded-lg",
        },
      },
    },
    compoundVariants: [
      {
        color: "primary",
        type: "light",
        class: { base: "bg-primary/5", icon: "text-primary" },
      },
      {
        color: "success",
        type: "light",
        class: {
          base: "bg-green-500/10",
          icon: "text-green-600",
        },
      },
      {
        color: "warning",
        type: "light",
        class: { base: "bg-amber-500/10", icon: "text-amber-600" },
      },
      {
        color: "error",
        type: "light",
        class: { base: "bg-destructive/10", icon: "text-destructive" },
      },
      {
        color: "info",
        type: "light",
        class: { base: "bg-blue-500/10", icon: "text-blue-600" },
      },
      // Dark
      {
        color: "primary",
        type: "dark",
        class: { base: "bg-primary", icon: "text-primary-foreground" },
      },
      {
        color: "success",
        type: "dark",
        class: { base: "bg-green-600", icon: "text-green-50" },
      },
      {
        color: "warning",
        type: "dark",
        class: { base: "bg-amber-600", icon: "text-amber-50" },
      },
      {
        color: "error",
        type: "dark",
        class: { base: "bg-destructive", icon: "text-destructive-foreground" },
      },
      {
        color: "info",
        type: "dark",
        class: { base: "bg-blue-500", icon: "text-blue-50" },
      },
      // Modern
      {
        type: "modern",
        class: { base: "border bg-background", icon: "text-muted-foreground" },
      },
    ],
    defaultVariants: {
      color: "primary",
      type: "modern",
      size: "lg",
      circle: false,
    },
  });
</script>
