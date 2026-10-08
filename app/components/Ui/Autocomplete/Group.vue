<template>
  <AutocompleteGroup
    data-slot="autocomplete-group"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </AutocompleteGroup>
</template>

<script lang="ts" setup>
  import { AutocompleteGroup } from "reka-ui";
  import type { ComboboxGroupProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxGroupProps & {
      /** Custom class(es) to add to the group. */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  // Groups that do not match the search are only hidden (`hidden` attribute), not removed. A divider
  // is drawn above a visible group only when another visible group comes before it, so filtered
  // groups never leave stray lines behind. Pass `class="border-t-0!"` to remove the divider.
  const styles = tv({
    base: "[[data-slot=autocomplete-group]:not([hidden])~&:not([hidden])]:border-border [[data-slot=autocomplete-group]:not([hidden])~&:not([hidden])]:mt-1 [[data-slot=autocomplete-group]:not([hidden])~&:not([hidden])]:border-t [[data-slot=autocomplete-group]:not([hidden])~&:not([hidden])]:pt-1",
  });
</script>
