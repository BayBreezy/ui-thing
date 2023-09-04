<template>
  <HoverCardPortal :to="to">
    <slot></slot>
  </HoverCardPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    to?: string | HTMLElement;
  }>();
</script>
