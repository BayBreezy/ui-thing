<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel class="justify-center">Vertical slider with input</UiLabel>
      <div class="flex h-40 flex-col items-center justify-center gap-4">
        <UiSlider
          v-model="value"
          class="data-[orientation=vertical]:min-h-0"
          :min="minValue"
          :max="maxValue"
          orientation="vertical"
          aria-label="Slider with input"
        />
        <UiInput
          v-model="value[0]"
          class="h-8 w-12 px-2 py-1"
          type="text"
          inputmode="decimal"
          aria-label="Enter value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0;
  const maxValue = 100;
  const initialValue = [25];
  const value = ref(initialValue);
</script>
