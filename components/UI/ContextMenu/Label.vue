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
      class?: any;
      inset?: boolean;
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
