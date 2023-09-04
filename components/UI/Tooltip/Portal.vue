<template>
  <TooltipPortal :to="to">
    <slot></slot>
  </TooltipPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
