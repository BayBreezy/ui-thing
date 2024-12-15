<template>
  <EditableEditTrigger v-bind="props">
    <slot />
  </EditableEditTrigger>
</template>

<script lang="ts" setup>
  import { EditableEditTrigger } from "radix-vue";
  import type { EditableEditTriggerProps } from "radix-vue";

  const props = defineProps<EditableEditTriggerProps>();
</script>
