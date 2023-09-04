<template>
  <SelectGroup :as-child="asChild">
    <slot></slot>
  </SelectGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
