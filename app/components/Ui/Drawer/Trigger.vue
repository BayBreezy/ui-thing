<template>
  <DrawerTrigger data-slot="drawer-trigger" v-bind="props">
    <slot />
  </DrawerTrigger>
</template>

<script lang="ts" setup>
  import { DrawerTrigger } from "reka-ui";
  import type { DrawerTriggerProps } from "reka-ui";

  const props = defineProps<DrawerTriggerProps>();
</script>
