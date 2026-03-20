<template>
  <MenubarRadioItem
    data-slot="menubar-radio-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <UiMenubarItemIndicator>
        <Icon v-if="icon" :name="icon" class="size-4" />
        <Icon v-else name="ph:circle-fill" class="size-2" />
      </UiMenubarItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </MenubarRadioItem>
</template>

<script lang="ts" setup>
  import { MenubarRadioItem, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarRadioItemEmits, MenubarRadioItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarRadioItemProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** The icon to display */
      icon?: string;
      /** The title of the component */
      title?: string;
    }
  >();

  const emits = defineEmits<MenubarRadioItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);

  const styles = tv({
    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  });
</script>
