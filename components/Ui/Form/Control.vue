<template>
  <Slot
    :id="formItemId"
    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error"
  >
    <slot />
  </Slot>
</template>

<script lang="ts" setup>
  import { Slot } from "radix-vue";

  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
</script>
