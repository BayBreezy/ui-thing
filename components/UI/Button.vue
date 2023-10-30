<template>
  <component
    :is="elementType"
    :class="
      buttonStyles({
        disabled: disabled || loading,
        variant: variant,
        size: size,
        class: props.class,
      })
    "
    :disabled="disabled || loading"
    :to="to"
    :href="href"
    :type="type"
    @click="onClick"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from "vue-router";

  type ButtonProps = VariantProps<typeof buttonStyles>;
  const props = withDefaults(
    defineProps<{
      type?: "button" | "submit" | "reset";
      disabled?: boolean;
      loading?: boolean;
      onClick?: () => void;
      to?: string | RouteLocationRaw;
      href?: string;
      as?: string;
      class?: any;
      variant?: ButtonProps["variant"];
      size?: ButtonProps["size"];
    }>(),
    {
      type: "button",
    }
  );

  const elementType = computed(() => {
    if (props.as) return props.as;
    if (props.href || props.to) return resolveComponent("NuxtLink");
    return "button";
  });
</script>
