<template>
  <ComboboxGroup :class="styles({ class: props.class })" v-bind="props">
    <slot name="heading">
      <UICommandLabel v-if="heading" :label="heading" />
    </slot>
    <slot> </slot>
  </ComboboxGroup>
</template>

<script lang="ts" setup>
  import { ComboboxGroup } from "radix-vue";
  import type { ComboboxGroupProps } from "radix-vue";

  const props = defineProps<
    ComboboxGroupProps & {
      heading?: any;
      class?: any;
    }
  >();

  const styles = tv({
    base: "overflow-hidden p-1 text-foreground",
  });
</script>
