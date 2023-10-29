<template>
  <DropdownMenuGroup v-bind="forwarded">
    <slot></slot>
  </DropdownMenuGroup>
</template>

<script lang="ts" setup>
  import { DropdownMenuGroup, useForwardProps } from "radix-vue";
  import type { DropdownMenuGroupProps } from "radix-vue";

  const props = defineProps<DropdownMenuGroupProps>();
  const forwarded = useForwardProps(props);
</script>
