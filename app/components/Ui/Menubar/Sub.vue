<template>
  <MenubarSub v-bind="forwarded">
    <slot />
  </MenubarSub>
</template>

<script lang="ts" setup>
  import { MenubarSub, useForwardPropsEmits } from "radix-vue";
  import type { MenubarSubEmits, MenubarSubProps } from "radix-vue";

  const props = defineProps<MenubarSubProps>();
  const emits = defineEmits<MenubarSubEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
