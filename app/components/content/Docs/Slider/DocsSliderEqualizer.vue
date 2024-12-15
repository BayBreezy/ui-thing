<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <legend class="text-center text-sm font-medium text-foreground">Equalizer</legend>
      <div class="flex h-48 justify-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v1"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="60 Hz"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v1.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v1[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">60</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v2"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="250 Hz"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v2.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v2[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">250</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v3"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="1k"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v3.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v3[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">1k</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v4"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="4k"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v4.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v4[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">4k</UiLabel>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UiSlider
            v-model="v5"
            :min
            :max
            orientation="vertical"
            class="[&>div[role=slider]]:h-6 [&>div[role=slider]]:w-4 [&>div[role=slider]]:rounded"
            aria-label="16k"
          >
            <template #thumb>
              <UiTooltip v-for="(t, i) in v5.length" :key="i" disable-closing-trigger>
                <UiTooltipTrigger as-child>
                  <UiSliderThumb />
                </UiTooltipTrigger>
                <UiTooltipContent class="text-xs" side="right" align="center">{{
                  v5[i]
                }}</UiTooltipContent>
              </UiTooltip>
            </template>
          </UiSlider>
          <UiLabel class="flex w-0 justify-center text-xs text-muted-foreground">16K</UiLabel>
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
