<template>
  <fieldset class="mx-auto w-fit space-y-2">
    <legend>Choose up to two notifications</legend>
    <UiCheckboxGroup v-model="selected" :max="2" orientation="vertical" class="space-y-2">
      <div v-for="option in options" :key="option" class="flex items-center gap-2">
        <UiCheckbox :id="`${id}-${option}`" :value="option" />
        <UiLabel :for="`${id}-${option}`">{{ option }}</UiLabel>
      </div>
    </UiCheckboxGroup>
  </fieldset>
</template>

<script setup lang="ts">
  const id = useId();
  const options = ["Email", "SMS", "Push"];
  const selected = ref<string[]>([]);
</script>
