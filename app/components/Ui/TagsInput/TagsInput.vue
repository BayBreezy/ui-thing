<template>
  <TagsInputRoot
    v-slot="slotProps"
    data-slot="tags-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>

<script lang="ts" setup>
  import { TagsInputRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { TagsInputRootEmits, TagsInputRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes["class"] }>();
  const emits = defineEmits<TagsInputRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: [
      "flex h-9 flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-1 text-sm shadow-xs dark:bg-input/30",
      "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
    ],
  });
</script>
