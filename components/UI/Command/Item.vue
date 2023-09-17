<template>
  <ComboboxItem
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :class="styles({ class: props.class })"
    @select="($event) => emits('select', $event)"
  >
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
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });

  const emits = defineEmits<{
    select: ComboboxItemEmits["select"];
  }>();
</script>
