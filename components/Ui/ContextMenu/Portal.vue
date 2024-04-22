<template>
  <ContextMenuPortal v-bind="props">
    <slot />
  </ContextMenuPortal>
</template>

<script lang="ts" setup>
  import { ContextMenuPortal } from "radix-vue";
  import type { ContextMenuPortalProps } from "radix-vue";

  const props = defineProps<ContextMenuPortalProps>();
</script>
