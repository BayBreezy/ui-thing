<template>
  <TagsInputItem
    v-bind="reactiveOmit(props, 'class', 'icon')"
    :class="styles({ class: props.class })"
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
  import { TagsInputItem } from "radix-vue";
  import type { TagsInputItemProps } from "radix-vue";

  const props = defineProps<TagsInputItemProps & { class?: any; icon?: string }>();
  const styles = tv({
    base: "inline-flex h-6 shrink-0 items-center gap-1.5 rounded bg-primary pl-2 pr-1 leading-none text-primary-foreground sm:text-sm",
  });
</script>
