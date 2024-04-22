<template>
  <SelectPortal v-bind="props">
    <slot />
  </SelectPortal>
</template>

<script lang="ts" setup>
  import { SelectPortal } from "radix-vue";
  import type { SelectPortalProps } from "radix-vue";

  const props = defineProps<SelectPortalProps>();
</script>
