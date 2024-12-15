<template>
  <ContextMenuTrigger v-bind="props">
    <slot />
  </ContextMenuTrigger>
</template>

<script lang="ts" setup>
  import { ContextMenuTrigger } from "radix-vue";
  import type { ContextMenuTriggerProps } from "radix-vue";

  const props = defineProps<ContextMenuTriggerProps>();
</script>
