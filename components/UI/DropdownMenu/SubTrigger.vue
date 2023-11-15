<template>
  <DropdownMenuSubTrigger v-bind="props" :class="styles({ inset, class: props.class })">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon
      class="ml-auto h-4 w-4 text-muted-foreground"
      :name="trailingIcon || 'lucide:chevron-right'"
    />
  </DropdownMenuSubTrigger>
</template>

<script lang="ts" setup>
  import { DropdownMenuSubTrigger, useForwardProps } from "radix-vue";
  import type { DropdownMenuSubTriggerProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuSubTriggerProps & {
      class?: any;
      inset?: boolean;
      asChild?: boolean;
      icon?: string;
      title?: string;
      trailingIcon?: string;
    }
  >();

  const styles = tv({
    base: "flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
