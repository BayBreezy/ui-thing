<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel class="justify-center">Vertical dual range slider and tooltip</UiLabel>
      <div class="flex h-40 justify-center">
        <UiSlider v-model="value" :max="10" orientation="vertical" aria-label="Vertical slider">
          <template #thumb>
            <UiTooltip v-for="(t, i) in value.length" :key="i" disable-closing-trigger>
              <UiTooltipTrigger as-child>
                <UiSliderThumb />
              </UiTooltipTrigger>
              <UiTooltipContent side="right" align="center">{{
                value[i] !== undefined ? value[i] : ""
              }}</UiTooltipContent>
            </UiTooltip>
          </template>
        </UiSlider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([2, 7]);
</script>
