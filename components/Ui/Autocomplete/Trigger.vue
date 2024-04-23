<template>
  <ComboboxTrigger v-bind="props">
    <slot />
  </ComboboxTrigger>
</template>

<script lang="ts" setup>
  import { ComboboxTrigger } from "radix-vue";
  import type { ComboboxTriggerProps } from "radix-vue";

  const props = defineProps<
    ComboboxTriggerProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center",
  });
</script>
