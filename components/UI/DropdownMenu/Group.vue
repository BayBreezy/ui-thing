<template>
  <DropdownMenuGroup :as-child="asChild">
    <slot></slot>
  </DropdownMenuGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
