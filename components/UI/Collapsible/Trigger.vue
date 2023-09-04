<template>
  <CollapsibleTrigger :as-child="asChild">
    <slot></slot>
  </CollapsibleTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
