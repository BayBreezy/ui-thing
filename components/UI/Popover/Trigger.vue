<template>
  <PopoverTrigger v-bind="$attrs" :as-child="asChild">
    <slot></slot>
  </PopoverTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();

  defineOptions({ inheritAttrs: false });
</script>
