<template>
  <ComboboxLabel
    data-slot="combobox-label"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="props"
  >
    <slot />
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  import { ComboboxLabel } from "reka-ui";
  import type { ComboboxLabelProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxLabelProps & {
      /** Custom class(es) to add to the label. */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({ base: "text-muted-foreground px-2 py-1.5 text-sm font-medium" });
</script>
