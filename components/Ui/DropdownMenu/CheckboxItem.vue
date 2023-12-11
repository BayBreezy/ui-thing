<template>
  <DropdownMenuCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
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
  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuCheckboxItemProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** The shorttcut text to display */
      shortcut?: string;
      /** The title text to display */
      title?: string;
    }
  >();
  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "title", "shortcut", "class"), emits);

  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  });
</script>
