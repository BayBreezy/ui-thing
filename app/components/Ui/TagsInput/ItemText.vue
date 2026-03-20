<template>
  <TagsInputItemText
    data-slot="tags-input-item-text"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </TagsInputItemText>
</template>

<script lang="ts" setup>
  import { TagsInputItemText } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { TagsInputItemTextProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "",
  });
</script>
