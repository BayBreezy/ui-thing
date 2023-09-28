<template>
  <ToastTitle :asChild="props.asChild" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </ToastTitle>
</template>

<script lang="ts" setup>
  import { ToastTitleProps } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      asChild?: ToastTitleProps["asChild"];
      title?: string;
      class?: any;
    }>(),
    {}
  );

  const styles = tv({
    base: "text-sm font-semibold",
  });
</script>
