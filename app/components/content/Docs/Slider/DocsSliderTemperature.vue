<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <UiLabel>Temperature</UiLabel>
        <div class="flex items-center gap-1">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                size="icon"
                variant="ghost"
                class="size-7"
                aria-label="Reset"
                @click="value = defaultValue"
              >
                <Icon name="lucide:rotate-ccw" class="size-4" aria-hidden="true" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent align="center" class="px-2 py-1 text-xs"
              >Reset to default</UiTooltipContent
            >
          </UiTooltip>
          <UiInput
            v-model="value[0]"
            class="h-7 w-12 px-2 py-0"
            type="text"
            input-mode="decimal"
            aria-label="Enter value"
          />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <UiSlider
          v-model="value"
          :min="minValue"
          :max="maxValue"
          :step="0.01"
          aria-label="Temperature"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = 0.0;
  const maxValue = 2;
  const defaultValue = [1];
  const value = ref([1.25]);

  watchEffect(() => {
    if (!value.value) return (value.value = defaultValue);
    if (!value.value[0]) return (value.value = defaultValue);
    if (value.value[0] < minValue) {
      value.value[0] = minValue;
    } else if (value.value[0] > maxValue) {
      value.value[0] = maxValue;
    }
  });
</script>
