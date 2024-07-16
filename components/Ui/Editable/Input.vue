<template>
  <EditableInput v-bind="props">
    <slot />
  </EditableInput>
</template>

<script lang="ts" setup>
  import { EditableInput } from "radix-vue";
  import type { EditableInputProps } from "radix-vue";

  const props = defineProps<EditableInputProps>();
</script>
