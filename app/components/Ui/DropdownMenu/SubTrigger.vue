<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    v-bind="forwarded"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="size-4" />
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon
      class="ml-auto size-4 text-muted-foreground"
      :name="trailingIcon || 'lucide:chevron-right'"
    />
  </DropdownMenuSubTrigger>
</template>

<script lang="ts" setup>
  import { DropdownMenuSubTrigger } from "reka-ui";
  import type { DropdownMenuSubTriggerProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuSubTriggerProps & {
      /**Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
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
    base: "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
