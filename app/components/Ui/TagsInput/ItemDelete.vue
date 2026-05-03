<template>
  <TagsInputItemDelete
    data-slot="tags-input-item-delete"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="m-auto size-3" />
    </slot>
  </TagsInputItemDelete>
</template>

<script lang="ts" setup>
  import { TagsInputItemDelete } from "reka-ui";
  import type { TagsInputItemDeleteProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<TagsInputItemDeleteProps & { icon?: string; class?: HTMLAttributes["class"] }>(),
    {
      icon: "lucide:x",
    }
  );
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex items-center justify-center p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
  });
</script>
