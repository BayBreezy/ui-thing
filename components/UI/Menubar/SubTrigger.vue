<template>
  <MenubarSubTrigger
    v-bind="reactiveOmit(props, 'class', 'inset', 'icon', 'title', 'trailingIcon')"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon
      class="ml-auto h-4 w-4 text-muted-foreground"
      :name="trailingIcon || 'lucide:chevron-right'"
    />
  </MenubarSubTrigger>
</template>

<script lang="ts" setup>
  import { MenubarSubTrigger } from "radix-vue";
  import type { MenubarSubTriggerProps } from "radix-vue";

  const props = defineProps<
    MenubarSubTriggerProps & {
      class?: any;
      inset?: boolean;
      icon?: string;
      title?: string;
      trailingIcon?: string;
    }
  >();

  const styles = tv({
    base: "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
