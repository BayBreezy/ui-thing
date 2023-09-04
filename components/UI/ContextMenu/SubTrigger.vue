<template>
  <ContextMenuSubTrigger
    :as-child="asChild"
    :disabled="disabled"
    :text-value="textValue"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <Icon class="ml-auto h-4 w-4" :name="icon || 'lucide:chevron-right'" />
  </ContextMenuSubTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    inset?: boolean;
    textValue?: string;
    asChild?: boolean;
    disabled?: boolean;
    icon?: string;
    title?: string;
  }>();

  const styles = tv({
    base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
