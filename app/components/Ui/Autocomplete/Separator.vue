<template>
  <ComboboxSeparator v-bind="props">
    <slot />
  </ComboboxSeparator>
</template>

<script lang="ts" setup>
  import { ComboboxSeparator } from "radix-vue";
  import type { ComboboxSeparatorProps } from "radix-vue";

  const props = defineProps<ComboboxSeparatorProps>();
</script>
