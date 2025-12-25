<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    v-bind="forwarded"
    :data-inset="inset"
    :data-variant="variant"
    :class="styles({ inset, class: props.class, variant })"
  >
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>
    </slot>
  </ContextMenuItem>
</template>

<script lang="ts" setup>
  import { ContextMenuItem, useForwardPropsEmits } from "reka-ui";
  import type { ContextMenuItemEmits, ContextMenuItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ContextMenuItemProps & {
        /**Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
        /** Wether an indentation should be added to the item or not */
        inset?: boolean;
        /** The shortcut for the item */
        shortcut?: string;
        /** The title for the item */
        title?: string;
        /**
         * The variant of the item.
         */
        variant?: "default" | "destructive";
      }
    >(),
    {
      variant: "default",
    }
  );

  const emits = defineEmits<ContextMenuItemEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "inset", "shortcut", "title"),
    emits
  );

  const styles = tv({
    base: "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
    variants: {
      inset: {
        true: "pl-8",
      },
      variant: {
        default: "",
        destructive:
          "text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20",
      },
    },
  });
</script>
