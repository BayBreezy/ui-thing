<template>
  <AlertDialogTrigger v-bind="props">
    <slot></slot>
  </AlertDialogTrigger>
</template>

<script lang="ts" setup>
  import { AlertDialogTrigger, useForwardProps } from "radix-vue";
  import type { AlertDialogTriggerProps } from "radix-vue";

  const props = defineProps<AlertDialogTriggerProps>();
</script>
