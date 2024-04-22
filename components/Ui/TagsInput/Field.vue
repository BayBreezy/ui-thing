<template>
  <TagsInputInput v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot />
  </TagsInputInput>
</template>

<script lang="ts" setup>
  import { TagsInputInput } from "radix-vue";
  import type { TagsInputInputProps } from "radix-vue";

  const props = defineProps<TagsInputInputProps & { class?: any }>();

  const styles = tv({
    base: "flex-1 bg-transparent focus:outline-none sm:text-sm",
  });
</script>
