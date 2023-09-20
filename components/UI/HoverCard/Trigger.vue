<template>
  <HoverCardTrigger v-bind="$attrs" :as-child="asChild">
    <slot></slot>
  </HoverCardTrigger>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
