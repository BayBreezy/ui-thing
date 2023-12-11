<template>
  <ComboboxTrigger v-bind="props">
    <slot></slot>
  </ComboboxTrigger>
</template>

<script lang="ts" setup>
  import { ComboboxTrigger } from "radix-vue";
  import type { ComboboxTriggerProps } from "radix-vue";

  const props = defineProps<ComboboxTriggerProps>();
</script>
