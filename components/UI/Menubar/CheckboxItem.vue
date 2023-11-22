<template>
  <MenubarCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UiMenubarItemIndicator>
        <Icon :name="icon || 'lucide:check'" class="h-4 w-4" />
      </UiMenubarItemIndicator>
    </span>
    <slot>{{ title }}</slot>
    <slot name="shortcut">
      <UiMenubarShortcut v-if="shortcut">{{ shortcut }}</UiMenubarShortcut>
    </slot>
  </MenubarCheckboxItem>
</template>

<script lang="ts" setup>
  import { MenubarCheckboxItem, useForwardPropsEmits } from "radix-vue";
  import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from "radix-vue";

  const props = defineProps<
    MenubarCheckboxItemProps & {
      icon?: string;
      class?: any;
      title?: string;
      shortcut?: string;
    }
  >();
  const emits = defineEmits<MenubarCheckboxItemEmits>();

  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "icon", "class", "title", "shortcut"),
    emits
  );

  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
