<template>
  <ContextMenuRoot @update:open="emit('update:open', $event)" :modal="modal" :dir="dir">
    <slot></slot>
  </ContextMenuRoot>
</template>

<script lang="ts" setup>
  import type { ContextMenuRootProps } from "radix-vue";
  const props = defineProps<{
    modal?: boolean;
    dir?: ContextMenuRootProps["dir"];
  }>();

  const emit = defineEmits<{
    "update:open": [v: boolean];
  }>();
</script>
