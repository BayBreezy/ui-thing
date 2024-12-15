<template>
  <TagsInputClear v-bind="props" :class="styles({ class: props.class })">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />
    </slot>
  </TagsInputClear>
</template>

<script lang="ts" setup>
  import { TagsInputClear } from "radix-vue";
  import type { TagsInputClearProps } from "radix-vue";

  const props = withDefaults(defineProps<TagsInputClearProps & { icon?: string; class?: any }>(), {
    icon: "lucide:x",
  });
  const styles = tv({
    base: "flex items-center justify-center rounded bg-transparent p-1 opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",
  });
</script>
