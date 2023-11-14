<template>
  <ContextMenuItem
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UIContextMenuShortcut v-if="shortcut">{{ shortcut }}</UIContextMenuShortcut>
    </slot>
  </ContextMenuItem>
</template>

<script lang="ts" setup>
  import { ContextMenuItem, useEmitAsProps } from "radix-vue";
  import type { ContextMenuItemEmits, ContextMenuItemProps } from "radix-vue";

  const props = defineProps<
    ContextMenuItemProps & {
      class?: any;
      inset?: boolean;
      shortcut?: string;
      title?: string;
    }
  >();

  const emits = defineEmits<ContextMenuItemEmits>();

  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
