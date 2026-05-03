<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" :show-presets="true" :presets="presetColors" />
    <div class="text-muted-foreground text-sm">
      Selected color: <span class="font-mono font-semibold">{{ color }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#3B82F6");

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
</script>
