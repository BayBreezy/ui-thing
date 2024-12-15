<template>
  <ComboboxSeparator :as-child="asChild" :class="styles({ class: props.class })">
    <slot />
  </ComboboxSeparator>
</template>

<script lang="ts" setup>
  import { ComboboxSeparator } from "radix-vue";
  import type { ComboboxSeparatorProps } from "radix-vue";

  const props = defineProps<
    ComboboxSeparatorProps & {
      /**Custom class(es) to add to the element */
      class?: any;
    }
  >();
  const styles = tv({
    base: "-mx-1 h-px bg-border",
  });
</script>
