<template>
  <ListboxFilter
    data-slot="listbox-filter"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { ListboxFilter, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxFilterEmits, ListboxFilterProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ListboxFilterProps & { class?: HTMLAttributes["class"]; placeholder?: string }
  >();
  const emits = defineEmits<ListboxFilterEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: [
      "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    ],
  });
</script>
