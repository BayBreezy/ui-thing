<template>
  <DropdownMenuItem v-bind="forwarded" :class="styles({ inset, class: props.class })">
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      </slot>
      <slot name="title">
        <span v-if="title">{{ title }}</span>
      </slot>
    </slot>
    <slot name="shortcut">
      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>
    </slot>
  </DropdownMenuItem>
</template>

<script lang="ts" setup>
  import { DropdownMenuItem, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuItemProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** Whether to inset the content */
      inset?: boolean;
      /** The shorttcut text to display */
      shortcut?: string;
      /** The title text to display */
      title?: string;
      /** The icon to display */
      icon?: string;
    }
  >();

  const emits = defineEmits<DropdownMenuItemEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),
    emits
  );

  const styles = tv({
    base: "relative flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
