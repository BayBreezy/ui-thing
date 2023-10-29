<template>
  <AspectRatio v-bind="forwarded">
    <slot />
  </AspectRatio>
</template>

<script lang="ts" setup>
  import { AspectRatio, useForwardProps } from "radix-vue";
  import type { AspectRatioProps } from "radix-vue";

  const props = defineProps<AspectRatioProps>();
  const forwarded = useForwardProps(props);
</script>
