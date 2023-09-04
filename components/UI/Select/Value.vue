<template>
  <SelectValue :as-child="asChild" :placeholder="placeholder">
    <slot></slot>
  </SelectValue>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      asChild?: boolean;
    }>(),
    {}
  );
</script>
