<template>
  <MenubarGroup :as-child="asChild">
    <slot></slot>
  </MenubarGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
