<template>
  <ComboboxEmpty v-bind="props">
    <slot />
  </ComboboxEmpty>
</template>

<script lang="ts" setup>
  import { ComboboxEmpty } from "radix-vue";
  import type { ComboboxEmptyProps } from "radix-vue";

  const props = defineProps<ComboboxEmptyProps>();
</script>
