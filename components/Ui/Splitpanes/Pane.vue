<template>
  <Pane v-bind="props">
    <slot />
  </Pane>
</template>

<script lang="ts" setup>
  import { Pane } from "splitpanes";

  const props = withDefaults(
    defineProps<{
      size?: number | string | null;
      minSize?: number | string;
      maxSize?: number | string;
    }>(),
    {
      size: null,
      minSize: 0,
      maxSize: 100,
    }
  );
</script>
