<template>
  <ContextMenuCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UiContextMenuItemIndicator icon="lucide:check" />
    </span>
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>
    </slot>
  </ContextMenuCheckboxItem>
</template>

<script lang="ts" setup>
  import { ContextMenuCheckboxItem, useForwardPropsEmits } from "radix-vue";
  import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "radix-vue";

  const props = defineProps<
    ContextMenuCheckboxItemProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /**The shortcut for the item */
      shortcut?: string;
      /**The title for the item */
      title?: string;
    }
  >();

  const emits = defineEmits<ContextMenuCheckboxItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "shortcut", "title"), emits);
  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
