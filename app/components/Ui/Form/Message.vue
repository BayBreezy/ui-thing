<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="text-destructive text-sm font-medium"
  />
</template>

<script lang="ts" setup>
  const { name, formMessageId } = useFormField();
</script>
