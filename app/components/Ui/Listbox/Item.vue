<template>
  <ListboxItem
    data-slot="listbox-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <UiListboxItemIndicator :icon="icon" />
    </span>
  </ListboxItem>
</template>

<script lang="ts" setup>
  import { ListboxItem, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxItemEmits, ListboxItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ListboxItemProps & {
      class?: HTMLAttributes["class"];
      icon?: string;
    }
  >();
  const emits = defineEmits<ListboxItemEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emits);

  const styles = tv({
    base: "relative flex w-full cursor-pointer items-center rounded-sm py-2 pr-8 pl-3 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:ring-1 data-highlighted:ring-border",
  });
</script>
