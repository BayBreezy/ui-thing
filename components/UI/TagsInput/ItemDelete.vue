<template>
  <TagsInputItemDelete
    v-bind="reactiveOmit(props, 'icon', 'class')"
    :class="styles({ class: props.class })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />
    </slot>
  </TagsInputItemDelete>
</template>

<script lang="ts" setup>
  import { TagsInputItemDelete } from "radix-vue";
  import type { TagsInputItemDeleteProps } from "radix-vue";

  const props = withDefaults(
    defineProps<TagsInputItemDeleteProps & { icon?: string; class?: any }>(),
    {
      icon: "lucide:x",
    }
  );

  const styles = tv({
    base: "flex items-center justify-center rounded bg-transparent opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",
  });
</script>
