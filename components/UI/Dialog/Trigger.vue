<template>
  <DialogTrigger v-bind="props">
    <slot></slot>
  </DialogTrigger>
</template>

<script lang="ts" setup>
  import { DialogTrigger, useForwardProps } from "radix-vue";
  import type { DialogTriggerProps } from "radix-vue";

  const props = defineProps<DialogTriggerProps>();
</script>
