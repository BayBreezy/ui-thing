<template>
  <AutocompleteCancel data-slot="autocomplete-cancel" v-bind="props">
    <slot />
  </AutocompleteCancel>
</template>

<script lang="ts" setup>
  import { AutocompleteCancel } from "reka-ui";
  import type { ComboboxCancelProps } from "reka-ui";

  const props = defineProps<ComboboxCancelProps>();
</script>
