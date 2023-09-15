<template>
  <ComboboxPortal v-bind="props">
    <slot></slot>
  </ComboboxPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
