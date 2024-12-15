<template>
  <MenubarArrow v-bind="props" />
</template>

<script lang="ts" setup>
  import { MenubarArrow } from "radix-vue";
  import type { MenubarArrowProps } from "radix-vue";

  const props = withDefaults(defineProps<MenubarArrowProps>(), {
    width: 10,
    height: 5,
  });
</script>
