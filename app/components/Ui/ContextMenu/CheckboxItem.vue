<template>
  <ContextMenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
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
  import { ContextMenuCheckboxItem, useForwardPropsEmits } from "reka-ui";
  import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuCheckboxItemProps & {
      /**Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      /**The shortcut for the item */
      shortcut?: string;
      /**The title for the item */
      title?: string;
    }
  >();

  const emits = defineEmits<ContextMenuCheckboxItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "shortcut", "title"), emits);

  const styles = tv({
    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });
</script>
