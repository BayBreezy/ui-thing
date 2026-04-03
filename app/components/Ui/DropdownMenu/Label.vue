<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    :class="styles({ inset, class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ label }}</slot>
  </DropdownMenuLabel>
</template>

<script lang="ts" setup>
  import { DropdownMenuLabel } from "reka-ui";
  import type { DropdownMenuLabelProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuLabelProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** Whether to inset the content */
      inset?: boolean;
      /** The label text to display */
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
