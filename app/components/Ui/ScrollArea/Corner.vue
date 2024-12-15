<template>
  <ScrollAreaCorner v-bind="props">
    <slot />
  </ScrollAreaCorner>
</template>

<script lang="ts" setup>
  import { ScrollAreaCorner } from "radix-vue";
  import type { ScrollAreaCornerProps } from "radix-vue";

  const props = defineProps<ScrollAreaCornerProps>();
</script>
