<template>
  <DialogTrigger v-bind="props">
    <slot />
  </DialogTrigger>
</template>

<script lang="ts" setup>
  import { DialogTrigger } from "radix-vue";
  import type { DialogTriggerProps } from "radix-vue";

  const props = defineProps<DialogTriggerProps>();
</script>
