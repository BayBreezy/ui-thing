<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center text-primary">
      <UiDropdownMenuItemIndicator>
        <Icon v-if="icon" :name="icon" class="size-4" />
        <Icon v-else name="ph:circle-fill" class="size-2" />
      </UiDropdownMenuItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </DropdownMenuRadioItem>
</template>

<script lang="ts" setup>
  import { DropdownMenuRadioItem, useForwardPropsEmits } from "reka-ui";
  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuRadioItemProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** The icon to display */
      icon?: string;
      /** The title text to display */
      title?: string;
    }
  >();

  const emits = defineEmits<DropdownMenuRadioItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);

  const styles = tv({
    base: "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });
</script>
