<template>
  <DropdownMenuSubTrigger v-bind="forwarded" :class="styles({ inset, class: props.class })">
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
  import { DropdownMenuSubTrigger } from "radix-vue";
  import type { DropdownMenuSubTriggerProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuSubTriggerProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /** Wether an indentation should be added to the item or not */
      inset?: boolean;
      /** The icon to display */
      icon?: string;
      /** The title for the item */
      title?: string;
      /** The trailing icon to display */
      trailingIcon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title", "trailingIcon");
  const styles = tv({
    base: "flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
