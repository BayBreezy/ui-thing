<template>
  <ComboboxItem
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :class="styles({ class: props.class })"
  >
    <slot></slot>
    <slot name="icon">
      <UIComboboxItemIndicator :icon="icon" />
    </slot>
  </ComboboxItem>
</template>

<script lang="ts" setup>
  import { ComboboxItemProps } from "radix-vue";
  const props = defineProps<{
    value: ComboboxItemProps["value"];
    disabled?: ComboboxItemProps["disabled"];
    asChild?: boolean;
    class?: any;
    icon?: string;
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
