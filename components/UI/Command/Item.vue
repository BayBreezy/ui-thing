<template>
  <ComboboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <slot name="icon">
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      </slot>
      {{ text }}
      <slot name="shortcut">
        <UICommandShortcut v-if="shortcut" :shortcut="shortcut" />
      </slot>
    </slot>
  </ComboboxItem>
</template>

<script lang="ts" setup>
  import { ComboboxItem, useForwardPropsEmits } from "radix-vue";
  import type { ComboboxItemEmits, ComboboxItemProps } from "radix-vue";

  const props = defineProps<
    ComboboxItemProps & {
      class?: any;
      icon?: string;
      text?: string;
      shortcut?: string;
    }
  >();
  const emit = defineEmits<ComboboxItemEmits>();
  const forwarded = useForwardPropsEmits(props, emit);

  const styles = tv({
    base: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  });
</script>
