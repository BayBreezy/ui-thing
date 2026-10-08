<template>
  <AutocompleteItem
    data-slot="autocomplete-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </AutocompleteItem>
</template>

<script lang="ts" setup>
  import { AutocompleteItem, useForwardPropsEmits } from "reka-ui";
  import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxItemProps & {
      /** Custom class(es) to add to the item. */
      class?: HTMLAttributes["class"];
    }
  >();

  const emits = defineEmits<{
    select: ComboboxItemEmits["select"];
  }>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50",
  });
</script>
