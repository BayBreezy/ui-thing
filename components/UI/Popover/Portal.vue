<template>
  <PopoverPortal :to="to">
    <slot></slot>
  </PopoverPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
