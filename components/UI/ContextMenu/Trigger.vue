<template>
  <ContextMenuTrigger v-bind="props">
    <slot></slot>
  </ContextMenuTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    disabled?: boolean;
  }>();
</script>
