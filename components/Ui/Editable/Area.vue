<template>
  <EditableArea v-bind="props">
    <slot />
  </EditableArea>
</template>

<script lang="ts" setup>
  import { EditableArea } from "radix-vue";
  import type { EditableAreaProps } from "radix-vue";

  const props = defineProps<EditableAreaProps>();
</script>
