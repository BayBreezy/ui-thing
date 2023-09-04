<template>
  <MenubarMenu :value="value">
    <slot></slot>
  </MenubarMenu>
</template>

<script lang="ts" setup>
  import { type MenubarMenuProps } from "radix-vue/dist/Menubar/MenubarMenu";
  const props = withDefaults(
    defineProps<{
      value?: MenubarMenuProps["value"];
      asChild?: boolean;
    }>(),
    {}
  );
</script>
