<template>
  <ComboboxLabel :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ label }}</slot>
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  import { ComboboxLabel, useForwardProps } from "radix-vue";
  import type { ComboboxLabelProps } from "radix-vue";

  const props = defineProps<
    ComboboxLabelProps & {
      class?: any;
      label?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["label", "class"]));

  const styles = tv({
    base: "px-2 py-1.5 text-xs font-medium text-muted-foreground",
  });
</script>
