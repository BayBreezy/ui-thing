<template>
  <div class="flex flex-col gap-6">
    <!-- Color Picker with all features -->
    <div class="space-y-2">
      <h3 class="text-sm font-semibold">Full Featured Color Picker</h3>
      <div class="rounded-lg border border-border bg-card p-4">
        <UiColorPicker
          v-model="selectedColor"
          :format="format"
          show-alpha
          show-format-toggle
          show-input
          show-presets
          :presets="presetColors"
          class="w-fit"
          @update:format="format = $event"
        />
      </div>
    </div>

    <!-- Display selected color details -->
    <div class="grid gap-4 sm:grid-cols-2">
      <!-- Color Information -->
      <UiCard>
        <UiCardContent class="space-y-3">
          <UiCardTitle class="text-sm font-semibold">Color Information</UiCardTitle>
          <div class="space-y-2 font-mono text-xs">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Current Format:</span>
              <span class="font-semibold uppercase">{{ format }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Value:</span>
              <span class="font-semibold">{{ selectedColor }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">HEX:</span>
              <span class="font-semibold">{{ hexValue }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">RGB:</span>
              <span class="font-semibold">{{ rgbValue }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">HSL:</span>
              <span class="font-semibold">{{ hslValue }}</span>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Large Color Preview -->
      <UiCard>
        <UiCardContent class="space-y-3">
          <UiCardTitle class="text-sm font-semibold">Preview</UiCardTitle>
          <div
            class="h-28 rounded-lg border-2 border-border shadow-md"
            :style="{
              backgroundColor: selectedColor,
              backgroundImage: hasAlpha
                ? `linear-gradient(${selectedColor}, ${selectedColor}), 
                 repeating-linear-gradient(45deg, #e5e7eb 0, #e5e7eb 2px, transparent 0, transparent 50%), 
                 repeating-linear-gradient(-45deg, #e5e7eb 0, #e5e7eb 2px, transparent 0, transparent 50%)`
                : 'none',
              backgroundSize: hasAlpha ? '100%, 8px 8px, 8px 8px' : 'auto',
              backgroundPosition: hasAlpha ? '0 0, 0 0, 4px 4px' : '0 0',
            }"
          ></div>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Preset Swatches Display -->
    <UiCard>
      <UiCardContent class="space-y-3">
        <UiCardTitle class="text-sm font-semibold">Available Presets</UiCardTitle>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(preset, index) in presetColors"
            :key="index"
            type="button"
            class="relative h-10 w-10 rounded-lg border-2 transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            :style="{ backgroundColor: preset }"
            :title="preset"
            @click="selectedColor = preset"
          >
            <span
              v-if="selectedColor === preset"
              class="absolute inset-0 flex items-center justify-center"
            >
              <Icon name="lucide:check" class="h-5 w-5 text-white drop-shadow" />
            </span>
          </button>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { colord } from "colord";

  const selectedColor = ref("#3B82F6");
  const format = ref<ColorFormat>("hex");

  const presetColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#10B981",
    "#14B8A6",
    "#06B6D4",
    "#0EA5E9",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#A855F7",
    "#D946EF",
    "#EC4899",
  ];

  // Computed properties for color format conversions
  const hexValue = computed(() => colord(selectedColor.value).toHex());
  const rgbValue = computed(() => colord(selectedColor.value).toRgbString());
  const hslValue = computed(() => colord(selectedColor.value).toHslString());
  const hasAlpha = computed(() => {
    const color = colord(selectedColor.value);
    return color.alpha() < 1;
  });
</script>
