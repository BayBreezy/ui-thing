<template>
  <DropdownMenuLabel :class="styles({ inset, class: props.class })" v-bind="forwarded">
    <slot>{{ label }}</slot>
  </DropdownMenuLabel>
</template>

<script lang="ts" setup>
  import { DropdownMenuLabel } from "radix-vue";
  import type { DropdownMenuLabelProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuLabelProps & {
      class?: any;
      inset?: boolean;
      label?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset", "label");
  const styles = tv({
    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",
    variants: {
      inset: { true: "pl-8" },
    },
  });
</script>
