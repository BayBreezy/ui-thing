<template>
  <TagsInputItemText v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot />
  </TagsInputItemText>
</template>

<script lang="ts" setup>
  import { TagsInputItemText } from "radix-vue";
  import type { TagsInputItemTextProps } from "radix-vue";

  const props = defineProps<TagsInputItemTextProps & { class?: any }>();

  const styles = tv({
    base: "leading-none sm:text-sm",
  });
</script>
