<template>
  <MenubarItem
    data-slot="menubar-item"
    v-bind="forwarded"
    :data-inset="inset"
    :data-variant="variant"
    :class="styles({ inset, class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" class="size-4" />
      </slot>
      <slot name="title">
        <span v-if="title" data-slot="menubar-item-title">{{ title }}</span>
      </slot>
    </slot>
    <slot name="shortcut">
      <UiMenubarShortcut v-if="shortcut" :variant data-slot="menubar-item-shortcut">{{
        shortcut
      }}</UiMenubarShortcut>
    </slot>
  </MenubarItem>
</template>

<script lang="ts" setup>
  import { MenubarItem, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarItemEmits, MenubarItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarItemProps & {
      inset?: boolean;
      class?: HTMLAttributes["class"];
      shortcut?: string;
      title?: string;
      icon?: string;
      variant?: "default" | "destructive";
    }
  >();

  const emits = defineEmits<MenubarItemEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon", "variant"),
    emits
  );

  const styles = tv({
    base: "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
