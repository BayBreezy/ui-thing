<template>
  <MenubarPortal data-slot="menubar-portal" v-bind="props">
    <slot />
  </MenubarPortal>
</template>

<script lang="ts" setup>
  import type { MenubarPortalProps } from "reka-ui";
  import { MenubarPortal } from "reka-ui";

  const props = defineProps<MenubarPortalProps>();
</script>
