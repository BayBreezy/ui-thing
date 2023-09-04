<template>
  <ContextMenuCheckboxItem
    :as-child="asChild"
    :checked="checked"
    :disabled="disabled"
    :text-value="textValue"
    :class="styles({ class: props.class })"
    @select="emits('select', $event)"
    @update:checked="emits('update:checked', $event)"
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <UIContextMenuItemIndicator icon="lucide:check" />
    </span>
    <slot>
      <span v-if="title">{{ title }}</span>
    </slot>
    <slot name="shortcut">
      <UIContextMenuShortcut v-if="shortcut">{{ shortcut }}</UIContextMenuShortcut>
    </slot>
  </ContextMenuCheckboxItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    checked?: boolean | "indeterminate";
    disabled?: boolean;
    textValue?: string;
    class?: any;
    shortcut?: string;
    title?: string;
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });

  const emits = defineEmits<{
    "update:checked": [e: boolean];
    select: [e: Event];
  }>();
</script>
