<template>
  <DialogPortal :to="to">
    <slot></slot>
  </DialogPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
