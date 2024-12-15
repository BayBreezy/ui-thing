<template>
  <MenubarMenu v-bind="props">
    <slot />
  </MenubarMenu>
</template>

<script lang="ts" setup>
  import { MenubarMenu } from "radix-vue";
  import type { MenubarMenuProps } from "radix-vue";

  const props = defineProps<MenubarMenuProps>();
</script>
