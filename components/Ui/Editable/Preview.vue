<template>
  <EditablePreview v-bind="props">
    <slot />
  </EditablePreview>
</template>

<script lang="ts" setup>
  import { EditablePreview } from "radix-vue";
  import type { EditablePreviewProps } from "radix-vue";

  const props = defineProps<EditablePreviewProps>();
</script>
