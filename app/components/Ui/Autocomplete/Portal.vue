<template>
  <AutocompletePortal data-slot="autocomplete-portal" position="popper" v-bind="props">
    <slot />
  </AutocompletePortal>
</template>

<script lang="ts" setup>
  import { AutocompletePortal } from "reka-ui";
  import type { ComboboxPortalProps } from "reka-ui";

  const props = defineProps<ComboboxPortalProps>();
</script>
