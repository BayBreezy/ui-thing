<template>
  <ComboboxCancel v-bind="props">
    <slot />
  </ComboboxCancel>
</template>

<script lang="ts" setup>
  import { ComboboxCancel } from "radix-vue";
  import type { ComboboxCancelProps } from "radix-vue";

  const props = defineProps<ComboboxCancelProps>();
</script>
