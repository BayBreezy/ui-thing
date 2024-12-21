<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <UiLabel class="tabular-nums">{{ value[0] }} credits/mo</UiLabel>
      <div class="flex items-center gap-4">
        <div>
          <UiButton
            variant="outline"
            size="icon"
            class="size-8"
            aria-label="Decrease value"
            :disabled="value[0] === 0"
            @click="decreaseValue"
          >
            <Icon name="lucide:minus" class="size-4" aria-hidden="true" />
          </UiButton>
        </div>
        <UiSlider
          v-model="value"
          class="flex-grow"
          :min="minValue"
          :max="maxValue"
          :step="steps"
          aria-label="Dual range slider with UiButtons"
        />
        <div>
          <UiButton
            variant="outline"
            size="icon"
            class="size-8"
            aria-label="Increase value"
            :disabled="value[0] === 200"
            @click="increaseValue"
          >
            <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0;
  const maxValue = 200;
  const steps = 5;
  const value = ref([100]);

  const decreaseValue = () => {
    if (value.value && value.value[0]) {
      value.value = [Math.max(minValue, value.value[0] - steps)];
    }
  };
  const increaseValue = () => {
    if (value.value && value.value[0]) {
      value.value = [Math.min(maxValue, value.value[0] + steps)];
    }
  };
</script>
