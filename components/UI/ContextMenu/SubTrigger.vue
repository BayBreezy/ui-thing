<template>
  <ContextMenuSubTrigger v-bind="props" :class="styles({ inset, class: props.class })">
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
      class?: any;
      inset?: boolean;
      icon?: string;
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
