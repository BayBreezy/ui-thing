<template>
  <AlertDialogTrigger v-bind="forwarded">
    <slot></slot>
  </AlertDialogTrigger>
</template>

<script lang="ts" setup>
  import { AlertDialogTrigger, useForwardProps } from "radix-vue";
  import type { AlertDialogTriggerProps } from "radix-vue";

  const props = defineProps<AlertDialogTriggerProps>();
  const forwarded = useForwardProps(props);
</script>
