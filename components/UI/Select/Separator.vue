<template>
  <SelectSeparator :class="styles({ class: props.class })" v-bind="props">
    <slot></slot>
  </SelectSeparator>
</template>

<script lang="ts" setup>
  import { SelectSeparator } from "radix-vue";
  import type { SelectSeparatorProps } from "radix-vue";

  const props = defineProps<
    SelectSeparatorProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-muted",
  });
</script>
