<template>
  <ComboboxRoot v-bind="forwarded">
    <slot></slot>
  </ComboboxRoot>
</template>

<script lang="ts" setup>
  import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";
  import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";

  const props = defineProps<ComboboxRootProps>();

  const emits = defineEmits<ComboboxRootEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
