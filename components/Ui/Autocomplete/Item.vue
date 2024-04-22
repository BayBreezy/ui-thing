<template>
  <ComboboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <slot name="icon">
      <span class="absolute inset-y-0 left-2 flex items-center justify-center">
        <UiAutocompleteItemIndicator class="animate-in fade-in-0 zoom-in-0" :icon="icon" />
      </span>
    </slot>
    <slot />
  </ComboboxItem>
</template>

<script lang="ts" setup>
  import { ComboboxItem, useForwardPropsEmits } from "radix-vue";
  import type { ComboboxItemEmits, ComboboxItemProps } from "radix-vue";

  const props = defineProps<
    ComboboxItemProps & {
      class?: any;
      icon?: string;
    }
  >();

  const emits = defineEmits<{
    select: ComboboxItemEmits["select"];
  }>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 pl-9 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
