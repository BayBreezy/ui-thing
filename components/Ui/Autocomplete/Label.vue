<template>
  <ComboboxLabel :class="styles({ class: props.class })" v-bind="props">
    <slot />
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  import { ComboboxLabel } from "radix-vue";
  import type { ComboboxLabelProps } from "radix-vue";

  const props = defineProps<
    ComboboxLabelProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "px-2 py-1.5 pl-9 text-sm font-medium text-muted-foreground",
  });
</script>
