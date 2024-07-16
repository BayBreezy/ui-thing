<template>
  <EditableCancelTrigger v-bind="props">
    <slot />
  </EditableCancelTrigger>
</template>

<script lang="ts" setup>
  import { EditableCancelTrigger } from "radix-vue";
  import type { EditableCancelTriggerProps } from "radix-vue";

  const props = defineProps<EditableCancelTriggerProps>();
</script>
