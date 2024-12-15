<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>

<script lang="ts" setup>
  import { SelectRoot, useForwardPropsEmits } from "radix-vue";
  import type { SelectRootEmits, SelectRootProps } from "radix-vue";

  const props = defineProps<SelectRootProps>();

  const emits = defineEmits<SelectRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>
