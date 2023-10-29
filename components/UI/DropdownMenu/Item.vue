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
      <UIDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UIDropdownMenuShortcut>
    </slot>
  </DropdownMenuItem>
</template>

<script lang="ts" setup>
  import { DropdownMenuItem, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuItemProps & {
      class?: any;
      inset?: boolean;
      shortcut?: string;
      title?: string;
      icon?: string;
    }
  >();

  const emits = defineEmits<DropdownMenuItemEmits>();
  const forwarded = useForwardPropsEmits(
    useOmit(props, ["class", "inset", "shortcut", "icon"]),
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
