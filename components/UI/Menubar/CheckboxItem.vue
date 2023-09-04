<template>
  <MenubarCheckboxItem
    :checked="checked"
    :disabled="disabled"
    :textValue="textValue"
    :as-child="asChild"
    @select="emits('select', $event)"
    @update:checked="emits('update:checked', $event)"
    :class="styles({ class: props.class })"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UIMenubarItemIndicator>
        <Icon :name="icon || 'lucide:check'" class="h-4 w-4" />
      </UIMenubarItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </MenubarCheckboxItem>
</template>

<script lang="ts" setup>
  import {
    type MenubarCheckboxItemEmits,
    type MenubarCheckboxItemProps,
  } from "radix-vue/dist/Menubar/MenubarCheckboxItem";

  const props = defineProps<{
    checked?: MenubarCheckboxItemProps["checked"];
    disabled?: MenubarCheckboxItemProps["disabled"];
    textValue?: MenubarCheckboxItemProps["textValue"];
    asChild?: boolean;
    icon?: string;
    class?: any;
    title?: string;
  }>();
  const emits = defineEmits<{
    "update:checked": MenubarCheckboxItemEmits["update:checked"];
    select: MenubarCheckboxItemEmits["select"];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
