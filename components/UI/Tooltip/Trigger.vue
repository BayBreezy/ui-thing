<template>
  <TooltipTrigger v-bind="$attrs" :as-child="asChild">
    <slot></slot>
  </TooltipTrigger>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
