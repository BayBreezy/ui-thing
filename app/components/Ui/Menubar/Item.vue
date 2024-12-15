<template>
  <MenubarItem v-bind="forwarded" :class="styles({ inset, class: props.class })">
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      </slot>
      <slot name="title">
        <span v-if="title">{{ title }}</span>
      </slot>
    </slot>
    <slot name="shortcut">
      <UiMenubarShortcut v-if="shortcut">{{ shortcut }}</UiMenubarShortcut>
    </slot>
  </MenubarItem>
</template>

<script lang="ts" setup>
  import { MenubarItem, useForwardPropsEmits } from "radix-vue";
  import type { MenubarItemEmits, MenubarItemProps } from "radix-vue";

  const props = defineProps<
    MenubarItemProps & {
      inset?: boolean;
      class?: any;
      shortcut?: string;
      title?: string;
      icon?: string;
    }
  >();

  const emits = defineEmits<MenubarItemEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),
    emits
  );

  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
