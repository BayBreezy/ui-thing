<template>
  <DropdownMenuTrigger v-bind="forwarded">
    <slot></slot>
  </DropdownMenuTrigger>
</template>

<script lang="ts" setup>
  import { DropdownMenuTrigger, useForwardProps } from "radix-vue";
  import type { DropdownMenuTriggerProps } from "radix-vue";

  const props = defineProps<DropdownMenuTriggerProps>();
  const forwarded = useForwardProps(props);
</script>
