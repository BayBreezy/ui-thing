<template>
  <ComboboxItem
    data-slot="combobox-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
    <UiComboboxItemIndicator class="ml-auto pl-2" :icon="icon" />
  </ComboboxItem>
</template>

<script lang="ts" setup>
  import { ComboboxItem, useForwardPropsEmits } from "reka-ui";
  import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxItemProps & {
      /** Custom class(es) to add to the item. */
      class?: HTMLAttributes["class"];
      /** Icon shown when the item is selected. Defaults to a check mark. */
      icon?: string;
    }
  >();

  const emits = defineEmits<{
    select: ComboboxItemEmits["select"];
  }>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emits);

  const styles = tv({
    base: "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50",
  });
</script>
