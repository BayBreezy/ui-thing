<template>
  <ContextMenuPortal v-bind="props">
    <slot></slot>
  </ContextMenuPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
