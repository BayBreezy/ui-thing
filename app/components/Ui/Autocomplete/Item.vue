<template>
  <ComboboxItem
    data-slot="autocomplete-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot name="icon">
      <span class="absolute inset-y-0 left-2 flex items-center justify-center">
        <UiAutocompleteItemIndicator
          class="animate-in fade-in-0 zoom-in-0 flex items-center justify-center"
          :icon="icon"
        />
      </span>
    </slot>
    <slot />
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
      /** Icon to display in the item indicator. */
      icon?: string;
    }
  >();

  const emits = defineEmits<{
    select: ComboboxItemEmits["select"];
  }>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "aria-selected:bg-accent aria-selected:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 pl-9 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50",
  });
</script>
