<template>
  <NavigationMenuItem v-bind="props">
    <slot></slot>
  </NavigationMenuItem>
</template>

<script lang="ts" setup>
  import { NavigationMenuItem } from "radix-vue";
  import type { NavigationMenuItemProps } from "radix-vue";

  const props = defineProps<NavigationMenuItemProps>();
</script>
