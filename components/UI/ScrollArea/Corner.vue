<template>
  <ScrollAreaCorner :as-child="asChild">
    <slot></slot>
  </ScrollAreaCorner>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
