<template>
  <ContextMenuSubTrigger
    v-bind="reactiveOmit(props, 'class', 'inset', 'icon', 'title')"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon class="ml-auto h-4 w-4" :name="icon || 'lucide:chevron-right'" />
  </ContextMenuSubTrigger>
</template>

<script lang="ts" setup>
  import { ContextMenuSubTrigger } from "radix-vue";
  import type { ContextMenuSubTriggerProps } from "radix-vue";

  const props = defineProps<
    ContextMenuSubTriggerProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /** Wether an indentation should be added to the item or not */
      inset?: boolean;
      /** The icon to display */
      icon?: string;
      /** The title for the item */
      title?: string;
    }
  >();

  const styles = tv({
    base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
