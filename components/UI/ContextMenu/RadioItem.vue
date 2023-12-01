<template>
  <ContextMenuRadioItem v-bind="forwarded" :class="styles({ class: props.class })">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UiContextMenuItemIndicator>
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />
      </UiContextMenuItemIndicator>
    </span>
    <slot>{{ title }}</slot>
  </ContextMenuRadioItem>
</template>

<script lang="ts" setup>
  import { ContextMenuRadioItem, useForwardPropsEmits } from "radix-vue";
  import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from "radix-vue";

  const props = defineProps<
    ContextMenuRadioItemProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /**The icon to display */
      icon?: string;
      /**The title for the item */
      title?: string;
    }
  >();

  const emits = defineEmits<ContextMenuRadioItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);

  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
