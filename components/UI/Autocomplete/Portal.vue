<template>
  <ComboboxPortal v-bind="props">
    <slot></slot>
  </ComboboxPortal>
</template>

<script lang="ts" setup>
  import { ComboboxPortal } from "radix-vue";
  import type { ComboboxPortalProps } from "radix-vue";

  const props = defineProps<ComboboxPortalProps>();
</script>
