<template>
  <ComboboxPortal position="popper" v-bind="props">
    <slot />
  </ComboboxPortal>
</template>

<script lang="ts" setup>
  import { ComboboxPortal } from "radix-vue";
  import type { ComboboxPortalProps } from "radix-vue";

  const props = defineProps<ComboboxPortalProps>();
</script>
