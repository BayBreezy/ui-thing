<template>
  <TagsInputRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </TagsInputRoot>
</template>

<script lang="ts" setup>
  import { TagsInputRoot, useForwardPropsEmits } from "radix-vue";
  import type { TagsInputRootEmits, TagsInputRootProps } from "radix-vue";

  const props = defineProps<TagsInputRootProps & { class?: any }>();
  const emits = defineEmits<TagsInputRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "flex min-h-[40px] w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 leading-none transition focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
