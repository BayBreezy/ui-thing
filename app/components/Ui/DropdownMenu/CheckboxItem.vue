<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center text-primary">
      <UiDropdownMenuItemIndicator icon="lucide:check" />
    </span>
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>
    </slot>
  </DropdownMenuCheckboxItem>
</template>

<script lang="ts" setup>
  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from "reka-ui";
  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuCheckboxItemProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** The shortcut text to display */
      shortcut?: string;
      /** The title text to display */
      title?: string;
    }
  >();
  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "title", "shortcut", "class"), emits);

  const styles = tv({
    base: "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });
</script>
