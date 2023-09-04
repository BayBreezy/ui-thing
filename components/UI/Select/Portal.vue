<template>
  <SelectPortal :to="to">
    <slot></slot>
  </SelectPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
