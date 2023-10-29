<template>
  <DropdownMenuPortal v-bind="forwarded">
    <slot></slot>
  </DropdownMenuPortal>
</template>

<script lang="ts" setup>
  import { DropdownMenuPortal, useForwardProps } from "radix-vue";
  import type { DropdownMenuPortalProps } from "radix-vue";

  const props = defineProps<DropdownMenuPortalProps>();
  const forwarded = useForwardProps(props);
</script>
