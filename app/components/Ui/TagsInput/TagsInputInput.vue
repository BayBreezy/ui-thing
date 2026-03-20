<template>
  <TagsInputInput
    data-slot="tags-input-input"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </TagsInputInput>
</template>

<script lang="ts" setup>
  import { TagsInputInput } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { TagsInputInputProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "min-h-6 w-full flex-1 bg-transparent px-1 text-sm focus:outline-none dark:bg-input/30",
  });
</script>
