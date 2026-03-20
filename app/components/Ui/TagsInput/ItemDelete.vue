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
  import { normalizeClass } from "vue";
  import type { TagsInputItemDeleteProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<TagsInputItemDeleteProps & { icon?: string; class?: HTMLAttributes["class"] }>(),
    {
      icon: "lucide:x",
    }
  );
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "flex items-center justify-center p-0 text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  });
</script>
