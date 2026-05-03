<template>
  <TagsInputItem
    data-slot="tags-input-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <slot name="text">
        <UiTagsInputItemText />
      </slot>
      <slot name="delete">
        <UiTagsInputItemDelete :icon="icon" />
      </slot>
    </slot>
  </TagsInputItem>
</template>

<script lang="ts" setup>
  import { TagsInputItem } from "reka-ui";
  import type { TagsInputItemProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    TagsInputItemProps & { class?: HTMLAttributes["class"]; icon?: string }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "border-input hover:bg-background dark:bg-accent relative flex h-7 items-center gap-1 rounded-sm border bg-transparent px-2 text-xs font-medium",
  });
</script>
