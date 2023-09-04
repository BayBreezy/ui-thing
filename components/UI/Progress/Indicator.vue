<template>
  <ProgressIndicator :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </ProgressIndicator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "h-full w-full flex-1 rounded-full bg-primary transition-all",
  });
</script>
