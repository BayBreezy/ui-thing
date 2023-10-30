<template>
  <ComboboxEmpty :class="styles({ class: props.class })" v-bind="forwarded">
    <slot></slot>
  </ComboboxEmpty>
</template>

<script lang="ts" setup>
  import { ComboboxEmpty, useForwardProps } from "radix-vue";
  import type { ComboboxEmptyProps } from "radix-vue";

  const props = defineProps<
    ComboboxEmptyProps & {
      class?: any;
    }
  >();

  const forwarded = useForwardProps(props);

  const styles = tv({
    base: "py-6 text-center text-sm",
  });
</script>
