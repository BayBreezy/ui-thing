<template>
  <ListboxItem v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <UiListboxItemIndicator :icon="icon" />
    </span>
  </ListboxItem>
</template>

<script lang="ts" setup>
  import { ListboxItem, useForwardPropsEmits } from "radix-vue";
  import type { ListboxItemEmits, ListboxItemProps } from "radix-vue";

  const props = defineProps<
    ListboxItemProps & {
      class?: any;
      icon?: string;
    }
  >();
  const emits = defineEmits<ListboxItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emits);

  const styles = tv({
    base: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:ring-1 data-[highlighted]:ring-border",
  });
</script>
