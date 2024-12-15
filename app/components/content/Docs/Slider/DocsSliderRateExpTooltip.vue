<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel>Rate your experience</UiLabel>
      <div class="flex items-center gap-2">
        <UiSlider v-model="value" :min="1" :max="5" aria-label="Rate your experience">
          <template #thumb>
            <UiTooltip v-for="(t, i) in value.length" :key="i" disable-closing-trigger>
              <UiTooltipTrigger as-child>
                <UiSliderThumb />
              </UiTooltipTrigger>
              <UiTooltipContent align="center">{{
                value[i] !== undefined ? labels[value[i] - 1] : ""
              }}</UiTooltipContent>
            </UiTooltip>
          </template>
        </UiSlider>
        <span v-if="value[0] !== undefined" class="text-2xl">{{ emojis[value[0] - 1] }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emojis = ["😡", "🙁", "😐", "🙂", "😍"];
  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];
  const value = ref([3]);
</script>
