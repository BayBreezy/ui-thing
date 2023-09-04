<template>
  <MenubarItem
    @select="emits('select', $event)"
    :as="as"
    :as-child="asChild"
    :text-value="textValue"
    :disabled="disabled"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      </slot>
      <slot name="title">
        <span v-if="title">{{ title }}</span>
      </slot>
    </slot>
    <slot name="shortcut">
      <UIMenubarShortcut v-if="shortcut">{{ shortcut }}</UIMenubarShortcut>
    </slot>
  </MenubarItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    disabled?: boolean;
    textValue?: string;
    asChild?: boolean;
    as?: any;
    inset?: boolean;
    class?: any;
    shortcut?: string;
    title?: string;
    icon?: string;
  }>();

  const emits = defineEmits<{
    select: [e: Event];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
