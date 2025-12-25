<template>
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <UiContextMenuItemIndicator>
        <Icon v-if="icon" :name="icon" class="size-4" />
        <Icon v-else name="ph:circle-fill" class="size-2" />
      </UiContextMenuItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </ContextMenuRadioItem>
</template>

<script lang="ts" setup>
  import { ContextMenuRadioItem, useForwardPropsEmits } from "reka-ui";
  import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuRadioItemProps & {
      /**Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      /**The icon to display */
      icon?: string;
      /**The title for the item */
      title?: string;
    }
  >();

  const emits = defineEmits<ContextMenuRadioItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);

  const styles = tv({
    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });
</script>
