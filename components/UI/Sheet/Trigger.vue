<template>
  <DialogTrigger :as-child="asChild">
    <slot></slot>
  </DialogTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
