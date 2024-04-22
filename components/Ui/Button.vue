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
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from "vue-router";

  type ButtonProps = VariantProps<typeof buttonStyles>;
  const props = withDefaults(
    defineProps<{
      /** The type fro the button */
      type?: "button" | "submit" | "reset";
      /** Whether the button is disabled */
      disabled?: boolean;
      /** Whether the button is loading */
      loading?: boolean;
      /** The action to perform when the button is clicked */
      onClick?: any;
      /** The location to navigate to when the button is clicked */
      to?: string | RouteLocationRaw;
      /** The location to navigate to when the button is clicked */
      href?: string;
      /** The element to render the button as */
      as?: string;
      /** Custom class(es) to add to parent element */
      class?: any;
      /** The variant of the button */
      variant?: ButtonProps["variant"];
      /** The size of the button */
      size?: ButtonProps["size"];
      /** The text to display in the button */
      text?: string;
    }>(),
    {
      type: "button",
      onClick: undefined,
      to: undefined,
      href: undefined,
      as: undefined,
      class: undefined,
      text: undefined,
      variant: "default",
      size: "default",
    }
  );

  const elementType = computed(() => {
    if (props.as) return props.as;
    if (props.href || props.to) return resolveComponent("NuxtLink");
    return "button";
  });
</script>
