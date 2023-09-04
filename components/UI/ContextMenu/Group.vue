<template>
  <ContextMenuGroup :as-child="asChild">
    <slot></slot>
  </ContextMenuGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
