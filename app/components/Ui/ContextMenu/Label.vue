<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    :data-inset="inset"
    :class="styles({ inset, class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ label }}</slot>
  </ContextMenuLabel>
</template>

<script lang="ts" setup>
  import { ContextMenuLabel } from "reka-ui";
  import type { ContextMenuLabelProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuLabelProps & {
      /**Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      /** Wether an indentation should be added to the item or not */
      inset?: boolean;
      /** The label for the item */
      label?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset", "label");
  const styles = tv({
    base: "px-2 py-1.5 text-sm font-medium text-foreground data-[inset=true]:pl-8",
    variants: {
      inset: { true: "pl-8" },
    },
  });
</script>
