<template>
  <DropdownMenuItem
    @select="emits('select', $event)"
    :as-child="asChild"
    :disabled="disabled"
    :text-value="textValue"
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
      <UIDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UIDropdownMenuShortcut>
    </slot>
  </DropdownMenuItem>
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
    icon?: string;
  }>();

  const emits = defineEmits<{
    select: [e: Event];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
