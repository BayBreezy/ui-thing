<template>
  <DrawerPortal data-slot="drawer-portal" v-bind="props">
    <slot />
  </DrawerPortal>
</template>

<script lang="ts" setup>
  import { DrawerPortal } from "reka-ui";
  import type { DrawerPortalProps } from "reka-ui";

  const props = defineProps<DrawerPortalProps>();
</script>
