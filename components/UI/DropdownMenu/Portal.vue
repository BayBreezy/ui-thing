<template>
  <DropdownMenuPortal :to="to || 'body'">
    <slot></slot>
  </DropdownMenuPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
