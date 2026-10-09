<template>
  <DropdownMenuFilter
    data-slot="dropdown-menu-filter"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { DropdownMenuFilter, useForwardPropsEmits } from "reka-ui";
  import type { DropdownMenuFilterEmits, DropdownMenuFilterProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DropdownMenuFilterProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
      /** The placeholder text to display when the filter is empty. */
      placeholder?: string;
    }
  >();
  const emits = defineEmits<DropdownMenuFilterEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "placeholder:text-muted-foreground border-border -mx-1 -mt-1 mb-1 h-9 w-[calc(100%+0.5rem)] rounded-t-md border-b bg-transparent px-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
