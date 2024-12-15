<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel>Dual range slider with input</UiLabel>
      <div class="flex items-center gap-4">
        <UiInput
          v-model="value[0]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          inputmode="decimal"
          aria-label="Enter minimum value"
        />
        <UiSlider
          v-model="value"
          class="flex-grow"
          :min="minValue"
          :max="maxValue"
          aria-label="Dual range slider with input"
        />
        <UiInput
          v-model="value[1]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          inputmode="decimal"
          aria-label="Enter maximum value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0;
  const maxValue = 200;
  const initialValue = [50, 150];
  const value = ref(initialValue);
</script>
