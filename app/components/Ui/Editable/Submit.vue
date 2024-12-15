<template>
  <EditableSubmitTrigger v-bind="props">
    <slot />
  </EditableSubmitTrigger>
</template>

<script lang="ts" setup>
  import { EditableSubmitTrigger } from "radix-vue";
  import type { EditableSubmitTriggerProps } from "radix-vue";

  const props = defineProps<EditableSubmitTriggerProps>();
</script>
