<template>
  <ComboboxAnchor v-bind="props">
    <slot></slot>
  </ComboboxAnchor>
</template>

<script lang="ts" setup>
  import { ComboboxAnchor } from "radix-vue";
  import type { ComboboxAnchorProps } from "radix-vue";

  const props = defineProps<ComboboxAnchorProps>();
</script>
