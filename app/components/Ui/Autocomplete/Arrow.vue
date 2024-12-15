<template>
  <ComboboxArrow v-bind="props" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ComboboxArrow } from "radix-vue";
  import type { ComboboxArrowProps } from "radix-vue";

  const props = defineProps<
    ComboboxArrowProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "rotate-45 border bg-muted",
  });
</script>
