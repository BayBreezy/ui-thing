<template>
  <AlertDialogTrigger :as-child="asChild">
    <slot></slot>
  </AlertDialogTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
