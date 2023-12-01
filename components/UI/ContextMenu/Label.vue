<template>
  <ContextMenuLabel
    :class="styles({ inset, class: props.class })"
    v-bind="reactiveOmit(props, 'class', 'inset', 'label')"
  >
    <slot>{{ label }}</slot>
  </ContextMenuLabel>
</template>

<script lang="ts" setup>
  import { ContextMenuLabel } from "radix-vue";
  import type { ContextMenuLabelProps } from "radix-vue";

  const props = defineProps<
    ContextMenuLabelProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /** Wether an indentation should be added to the item or not */
      inset?: boolean;
      /** The label for the item */
      label?: string;
    }
  >();

  const styles = tv({
    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",
    variants: {
      inset: { true: "pl-8" },
    },
  });
</script>
