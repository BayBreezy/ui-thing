<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with ticks</UiLabel>
      <div>
        <UiSlider v-model="value" :max="max" aria-label="Slider with ticks" />
        <span
          class="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span
            v-for="(_, i) in ticks"
            :key="i"
            class="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span :class="['h-1 w-px bg-muted-foreground/70', i % skipInterval !== 0 && 'h-0.5']" />
            <span :class="[i % skipInterval === 0 && 'opacity-0']">{{ i }}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const max = 12;
  const skipInterval = 2; // Set to 1 to allow no text skipping
  const ticks = [...Array(max + 1)].map((_, i) => i);
  const value = ref([5]);
</script>
