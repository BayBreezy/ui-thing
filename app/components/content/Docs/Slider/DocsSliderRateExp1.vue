<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Rate your experience</UiLabel>
        <span class="text-sm font-medium">{{
          value[0] !== undefined ? labels[value[0] - 1] : ""
        }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-2xl">😡</span>
        <UiSlider v-model="value" :min="1" :max="5" aria-label="Rate your experience" />
        <span class="text-2xl">😍</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];
  const value = ref([3]);
</script>
