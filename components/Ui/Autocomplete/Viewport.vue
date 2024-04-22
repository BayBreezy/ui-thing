<template>
  <ComboboxViewport v-bind="props">
    <slot />
  </ComboboxViewport>
</template>

<script lang="ts" setup>
  import { ComboboxViewport } from "radix-vue";
  import type { ComboboxViewportProps } from "radix-vue";

  const props = defineProps<ComboboxViewportProps>();
</script>
