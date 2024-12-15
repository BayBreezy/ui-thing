<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <legend class="text-sm font-medium text-foreground">Object position</legend>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <UiLabel class="text-xs text-muted-foreground">X</UiLabel>
          <UiSlider
            v-model="x"
            class="flex-grow [&>:last-child>div]:rounded"
            :min="minValue"
            :max="maxValue"
            aria-label="X"
          />
          <UiInput v-model="x[0]" class="h-8 w-12 px-2 py-1" type="text" aria-label="Enter value" />
        </div>
        <div class="flex items-center gap-2">
          <UiLabel class="text-xs text-muted-foreground">Y</UiLabel>
          <UiSlider
            v-model="y"
            class="flex-grow [&>:last-child>div]:rounded"
            :min="minValue"
            :max="maxValue"
            aria-label="Y"
          />
          <UiInput v-model="y[0]" class="h-8 w-12 px-2 py-1" type="text" aria-label="Enter value" />
        </div>
        <div class="flex items-center gap-2">
          <UiLabel class="text-xs text-muted-foreground">Z</UiLabel>
          <UiSlider
            v-model="z"
            class="flex-grow [&>:last-child>div]:rounded"
            :min="minValue"
            :max="maxValue"
            aria-label="Z"
          />
          <UiInput v-model="z[0]" class="h-8 w-12 px-2 py-1" type="text" aria-label="Enter value" />
        </div>
      </div>
      <UiButton class="w-full" variant="outline" @click="resetAll">
        <Icon name="lucide:rotate-ccw" class="-ms-1 me-2 size-4 opacity-60" aria-hidden="true" />
        Reset
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const minValue = -10;
  const maxValue = 10;

  const x = ref([-2]);
  const y = ref([4]);
  const z = ref([2]);

  const resetAll = () => {
    x.value = [0];
    y.value = [0];
    z.value = [0];
  };
</script>
