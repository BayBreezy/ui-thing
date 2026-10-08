<template>
  <AutocompleteEmpty data-slot="autocomplete-empty" v-bind="props">
    <slot />
  </AutocompleteEmpty>
</template>

<script lang="ts" setup>
  import { AutocompleteEmpty } from "reka-ui";
  import type { ComboboxEmptyProps } from "reka-ui";

  const props = defineProps<ComboboxEmptyProps>();
</script>
