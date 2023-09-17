<template>
  <ComboboxItem
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :class="styles({ class: props.class })"
    @select="emits('select', $event)"
  >
    <slot name="icon">
      <span class="absolute inset-y-0 left-2 flex items-center justify-center">
        <UIComboboxItemIndicator class="animate-in fade-in-0 zoom-in-0" :icon="icon" />
      </span>
    </slot>
    <slot></slot>
  </ComboboxItem>
</template>

<script lang="ts" setup>
  import { ComboboxItemProps, ComboboxItemEmits } from "radix-vue";
  const props = defineProps<{
    value: ComboboxItemProps["value"];
    disabled?: ComboboxItemProps["disabled"];
    asChild?: boolean;
    class?: any;
    icon?: string;
  }>();

  const emits = defineEmits<{
    select: ComboboxItemEmits["select"];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 pl-9 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
