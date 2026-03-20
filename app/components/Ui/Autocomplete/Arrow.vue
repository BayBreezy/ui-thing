<template>
  <ComboboxArrow
    data-slot="autocomplete-arrow"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { ComboboxArrow } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComboboxArrowProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxArrowProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({ base: "fill-muted stroke-border" });
</script>
