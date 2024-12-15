<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="text-sm font-medium text-destructive"
  />
</template>

<script lang="ts" setup>
  const { name, formMessageId } = useFormField();
</script>
