<template>
  <MenubarMenu v-bind="forwarded">
    <slot></slot>
  </MenubarMenu>
</template>

<script lang="ts" setup>
  import { MenubarMenu, useForwardProps } from "radix-vue";
  import type { MenubarMenuProps } from "radix-vue";

  const props = defineProps<MenubarMenuProps>();
  const forwarded = useForwardProps(props);
</script>
