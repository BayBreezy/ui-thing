<template>
  <slot />
</template>
<script lang="ts" setup>
  import { ItemIndexKey } from "./Terminal.vue";

  const props = defineProps<{
    index: number;
  }>();

  provide(ItemIndexKey, props.index);
</script>
