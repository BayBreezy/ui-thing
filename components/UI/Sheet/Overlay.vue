<template>
  <DialogOverlay :as-child="asChild" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",
  });
</script>
