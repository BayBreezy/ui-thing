<template>
  <TooltipArrow :as-child="asChild" :width="width" :height="height" />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      asChild?: boolean;
      width?: number;
      height?: number;
    }>(),
    {
      width: 10,
      height: 5,
    }
  );
</script>
