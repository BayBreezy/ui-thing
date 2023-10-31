<template>
  <DropdownMenuCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UIDropdownMenuItemIndicator icon="lucide:check" />
    </span>
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UIDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UIDropdownMenuShortcut>
    </slot>
  </DropdownMenuCheckboxItem>
</template>

<script lang="ts" setup>
  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuCheckboxItemProps & {
      class?: any;
      shortcut?: string;
      title?: string;
    }
  >();
  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  });
</script>
