<template>
  <div class="flex items-center justify-center">
    <UiPopover>
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" class="w-fit justify-start gap-2 px-2">
          <div class="size-4 rounded border border-input" :style="{ backgroundColor: color }"></div>
          <span class="font-mono text-xs">{{ color }}</span>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-auto p-3" align="start">
        <UiColorPicker
          v-model="color"
          :show-alpha="true"
          :show-presets="true"
          :presets="presetColors"
        />
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#3B82F6");

  const presetColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#22C55E",
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];
</script>
