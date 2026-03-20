<template>
  <TagsInputClear
    data-slot="tags-input-clear"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />
    </slot>
  </TagsInputClear>
</template>

<script lang="ts" setup>
  import { TagsInputClear } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { TagsInputClearProps } from "reka-ui";
  import type { HtmlHTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<TagsInputClearProps & { icon?: string; class?: HtmlHTMLAttributes["class"] }>(),
    {
      icon: "lucide:x",
    }
  );
  const styles = tv({
    base: "flex items-center justify-center rounded bg-transparent p-1 opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",
  });
</script>
