<template>
  <MenubarPortal v-bind="props">
    <slot />
  </MenubarPortal>
</template>

<script lang="ts" setup>
  import { type MenubarPortalProps } from "radix-vue";

  const props = defineProps<MenubarPortalProps>();
</script>
