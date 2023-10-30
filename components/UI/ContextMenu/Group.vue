<template>
  <ContextMenuGroup v-bind="forwarded">
    <slot></slot>
  </ContextMenuGroup>
</template>

<script lang="ts" setup>
  import { ContextMenuGroup, useForwardProps } from "radix-vue";
  import type { ContextMenuGroupProps } from "radix-vue";

  const props = defineProps<ContextMenuGroupProps>();
  const forwarded = useForwardProps(props);
</script>
