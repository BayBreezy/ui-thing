<template>
  <MenubarPortal :to="to">
    <slot></slot>
  </MenubarPortal>
</template>

<script lang="ts" setup>
  import { type MenubarPortalProps } from "radix-vue";
  const props = defineProps<{
    to?: MenubarPortalProps["to"];
  }>();
</script>
