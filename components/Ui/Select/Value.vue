<template>
  <SelectValue v-bind="props">
    <slot />
  </SelectValue>
</template>

<script lang="ts" setup>
  import { SelectValue } from "radix-vue";
  import type { SelectValueProps } from "radix-vue";

  const props = defineProps<SelectValueProps>();
</script>
