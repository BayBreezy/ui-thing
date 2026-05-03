<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" :format="format" @update:format="format = $event" />
    <div class="text-muted-foreground flex flex-wrap gap-2 text-sm">
      <div>
        HEX: <span class="font-mono font-semibold">{{ hexColor }}</span>
      </div>
      <div>
        RGB: <span class="font-mono font-semibold">{{ rgbColor }}</span>
      </div>
      <div>
        HSL: <span class="font-mono font-semibold">{{ hslColor }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { colord } from "colord";

  const color = ref("#3B82F6");
  const format = ref<ColorFormat>("hex");

  const hexColor = computed(() => colord(color.value).toHex());
  const rgbColor = computed(() => colord(color.value).toRgbString());
  const hslColor = computed(() => colord(color.value).toHslString());
</script>
