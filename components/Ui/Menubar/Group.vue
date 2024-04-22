<template>
  <MenubarGroup v-bind="props">
    <slot />
  </MenubarGroup>
</template>

<script lang="ts" setup>
  import { MenubarGroup } from "radix-vue";
  import type { MenubarGroupProps } from "radix-vue";

  const props = defineProps<MenubarGroupProps>();
</script>
