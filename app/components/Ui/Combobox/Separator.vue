<template>
  <ComboboxSeparator
    data-slot="combobox-separator"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ComboboxSeparator>
</template>

<script lang="ts" setup>
  import { ComboboxSeparator } from "reka-ui";
  import type { ComboboxSeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxSeparatorProps & {
      /** Custom class(es) to add to the separator. */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({ base: "bg-border my-1 h-px" });
</script>
