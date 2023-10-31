<template>
  <SelectValue v-bind="props">
    <slot></slot>
  </SelectValue>
</template>

<script lang="ts" setup>
  import { SelectValue } from "radix-vue";
  import type { SelectValueProps } from "radix-vue";

  const props = defineProps<SelectValueProps>();
</script>
