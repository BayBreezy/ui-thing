<template>
  <MenubarCheckboxItem
    data-slot="menubar-checkbox-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <UiMenubarItemIndicator>
        <Icon :name="icon || 'lucide:check'" />
      </UiMenubarItemIndicator>
    </span>
    <slot>{{ title }}</slot>
    <slot name="shortcut">
      <UiMenubarShortcut v-if="shortcut">{{ shortcut }}</UiMenubarShortcut>
    </slot>
  </MenubarCheckboxItem>
</template>

<script lang="ts" setup>
  import { MenubarCheckboxItem, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarCheckboxItemProps & {
      icon?: string;
      class?: HTMLAttributes["class"];
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
    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });
</script>
