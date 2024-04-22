<template>
  <ComboboxGroup v-bind="props">
    <slot />
  </ComboboxGroup>
</template>

<script lang="ts" setup>
  import { ComboboxGroup } from "radix-vue";
  import type { ComboboxGroupProps } from "radix-vue";

  const props = defineProps<ComboboxGroupProps>();
</script>
