<template>
  <DrawerClose data-slot="drawer-close" v-bind="props">
    <slot />
  </DrawerClose>
</template>

<script lang="ts" setup>
  import { DrawerClose } from "reka-ui";
  import type { DrawerCloseProps } from "reka-ui";

  const props = defineProps<DrawerCloseProps>();
</script>
