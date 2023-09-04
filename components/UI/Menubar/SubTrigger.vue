<template>
  <MenubarSubTrigger
    :as-child="asChild"
    :disabled="disabled"
    :text-value="textValue"
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
  const props = defineProps<{
    class?: any;
    inset?: boolean;
    textValue?: string;
    asChild?: boolean;
    disabled?: boolean;
    icon?: string;
    title?: string;
    trailingIcon?: string;
  }>();

  const styles = tv({
    base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
