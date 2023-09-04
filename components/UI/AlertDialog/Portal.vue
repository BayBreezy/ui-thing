<template>
  <AlertDialogPortal :to="to">
    <slot></slot>
  </AlertDialogPortal>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      to?: string | HTMLElement;
    }>(),
    {
      to: "body",
    }
  );
</script>
