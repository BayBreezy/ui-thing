<template>
  <SelectLabel :class="styles({ class: props.class })" v-bind="props">
    <slot></slot>
  </SelectLabel>
</template>

<script lang="ts" setup>
  import { SelectLabel } from "radix-vue";
  import type { SelectLabelProps } from "radix-vue";

  const props = defineProps<
    SelectLabelProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "py-1.5 pl-8 pr-2 text-sm font-semibold",
  });
</script>
