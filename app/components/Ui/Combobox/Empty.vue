<template>
  <ComboboxEmpty data-slot="combobox-empty" v-bind="props">
    <slot />
  </ComboboxEmpty>
</template>

<script lang="ts" setup>
  import { ComboboxEmpty } from "reka-ui";
  import type { ComboboxEmptyProps } from "reka-ui";

  const props = defineProps<ComboboxEmptyProps>();
</script>
