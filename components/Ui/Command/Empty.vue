<template>
  <ComboboxEmpty :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </ComboboxEmpty>
</template>

<script lang="ts" setup>
  import { ComboboxEmpty } from "radix-vue";
  import type { ComboboxEmptyProps } from "radix-vue";

  const props = defineProps<
    ComboboxEmptyProps & {
      /**Custom class(es) to add to the element */
      class?: any;
    }
  >();

  const styles = tv({
    base: "py-6 text-center text-sm",
  });
</script>
