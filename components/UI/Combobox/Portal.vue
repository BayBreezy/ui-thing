<template>
  <ComboboxPortal :to="to">
    <slot></slot>
  </ComboboxPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
