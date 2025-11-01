<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    v-bind="forwarded"
    :data-inset="inset"
    :data-variant="variant"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" class="size-4" />
      </slot>
      <slot name="title">
        <span v-if="title">{{ title }}</span>
      </slot>
    </slot>
    <slot name="shortcut">
      <UiDropdownMenuShortcut v-if="shortcut" :variant>{{ shortcut }}</UiDropdownMenuShortcut>
    </slot>
  </DropdownMenuItem>
</template>

<script lang="ts" setup>
  import { DropdownMenuItem, useForwardPropsEmits } from "reka-ui";
  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuItemProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** Whether to inset the content */
      inset?: boolean;
      /** The shortcut text to display */
      shortcut?: string;
      /** The title text to display */
      title?: string;
      /** The icon to display */
      icon?: string;
      /**
       * The variant of the item.
       *
       * @default "default"
       */
      variant?: "default" | "destructive";
    }
  >();

  const emits = defineEmits<DropdownMenuItemEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),
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
