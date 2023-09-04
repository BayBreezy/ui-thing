<template>
  <AlertDialogOverlay :as-child="asChild" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
  });
</script>
