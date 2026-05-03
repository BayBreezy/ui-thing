<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <legend class="text-foreground text-center text-sm font-medium">Equalizer</legend>
      <div class="flex h-48 justify-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v1"
            :min
            :max
            show-tooltip
            orientation="vertical"
            class="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:rounded"
            aria-label="60 Hz"
          />
          <UiLabel class="text-muted-foreground flex w-0 justify-center text-xs">60</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v2"
            :min
            :max
            show-tooltip
            orientation="vertical"
            class="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:rounded"
            aria-label="250 Hz"
          />
          <UiLabel class="text-muted-foreground flex w-0 justify-center text-xs">250</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v3"
            :min
            :max
            show-tooltip
            orientation="vertical"
            class="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:rounded"
            aria-label="1k"
          />
          <UiLabel class="text-muted-foreground flex w-0 justify-center text-xs">1k</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v4"
            :min
            :max
            show-tooltip
            orientation="vertical"
            class="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:rounded"
            aria-label="4k"
          />
          <UiLabel class="text-muted-foreground flex w-0 justify-center text-xs">4k</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v5"
            :min
            :max
            show-tooltip
            orientation="vertical"
            class="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:rounded"
            aria-label="16k"
          />
          <UiLabel class="text-muted-foreground flex w-0 justify-center text-xs">16K</UiLabel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const min = -5;
  const max = 5;
  const v1 = ref([2]);
  const v2 = ref([1]);
  const v3 = ref([-1]);
  const v4 = ref([-3]);
  const v5 = ref([2]);
</script>
