<template>
  <AlertDialogTrigger v-bind="props">
    <slot />
  </AlertDialogTrigger>
</template>

<script lang="ts" setup>
  import { AlertDialogTrigger } from "radix-vue";
  import type { AlertDialogTriggerProps } from "radix-vue";

  const props = defineProps<AlertDialogTriggerProps>();
</script>
