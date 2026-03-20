<template>
  <ComboboxLabel
    data-slot="autocomplete-label"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="props"
  >
    <slot />
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  import { ComboboxLabel } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComboboxLabelProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxLabelProps & {
      /** Custom class(es) to add to the label */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({ base: "px-2 py-1.5 pl-9 text-sm font-medium text-muted-foreground" });
</script>
