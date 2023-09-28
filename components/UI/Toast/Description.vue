<template>
  <ToastDescription :asChild="props.asChild" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </ToastDescription>
</template>

<script lang="ts" setup>
  import { ToastDescriptionProps } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      asChild?: ToastDescriptionProps["asChild"];
      description?: string;
      class?: any;
    }>(),
    {}
  );

  const styles = tv({
    base: "text-sm opacity-90",
  });
</script>
