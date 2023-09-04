<template>
  <ClientOnly>
    <TooltipTrigger v-bind="$attrs" :as-child="asChild">
      <slot></slot>
    </TooltipTrigger>
  </ClientOnly>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
