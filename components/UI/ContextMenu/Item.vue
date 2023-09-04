<template>
  <ContextMenuItem
    @select="emits('select', $event)"
    :as-child="asChild"
    :disabled="disabled"
    :text-value="textValue"
    :class="styles({ inset, class: props.class })"
  >
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UIContextMenuShortcut v-if="shortcut">{{ shortcut }}</UIContextMenuShortcut>
    </slot>
  </ContextMenuItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    disabled?: boolean;
    textValue?: string;
    class?: any;
    inset?: boolean;
    shortcut?: string;
    title?: string;
  }>();

  const emits = defineEmits<{
    select: [e: Event];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
