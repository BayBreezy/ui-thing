<template>
  <ComboboxItemIndicator v-bind="props">
    <slot><Icon :name="icon || 'ph:check'" class="h-4 w-4" /></slot>
  </ComboboxItemIndicator>
</template>

<script lang="ts" setup>
  import { ComboboxItemIndicator } from "radix-vue";
  import type { ComboboxItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    ComboboxItemIndicatorProps & {
      icon?: string;
    }
  >();
</script>
