<template>
  <AspectRatio v-bind="props">
    <slot />
  </AspectRatio>
</template>

<script lang="ts" setup>
  import { AspectRatio } from "radix-vue";
  import type { AspectRatioProps } from "radix-vue";

  const props = defineProps<AspectRatioProps>();
</script>
