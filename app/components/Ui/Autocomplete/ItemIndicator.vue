<template>
  <AutocompleteItemIndicator data-slot="autocomplete-item-indicator" v-bind="props">
    <slot><Icon :name="icon || 'lucide:check'" class="size-4" /></slot>
  </AutocompleteItemIndicator>
</template>

<script lang="ts" setup>
  import { AutocompleteItemIndicator } from "reka-ui";
  import type { ComboboxItemIndicatorProps } from "reka-ui";

  const props = defineProps<
    ComboboxItemIndicatorProps & {
      icon?: string;
    }
  >();
</script>
