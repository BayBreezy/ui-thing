<template>
  <SelectItemText v-bind="props">
    <slot />
  </SelectItemText>
</template>

<script lang="ts" setup>
  import { SelectItemText } from "radix-vue";
  import type { SelectItemTextProps } from "radix-vue";

  const props = defineProps<SelectItemTextProps>();
</script>
