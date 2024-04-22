<template>
  <MenubarRadioGroup v-bind="forwarded">
    <slot />
  </MenubarRadioGroup>
</template>

<script lang="ts" setup>
  import { MenubarRadioGroup, useForwardPropsEmits } from "radix-vue";
  import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from "radix-vue";

  const props = defineProps<MenubarRadioGroupProps>();
  const emits = defineEmits<MenubarRadioGroupEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
