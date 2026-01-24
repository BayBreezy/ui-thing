<template>
  <SliderRoot
    v-model="hueModel"
    data-slot="color-picker-hue"
    orientation="vertical"
    :min="0"
    :max="359.999"
    :step="0.1"
    class="relative flex h-40 w-6 touch-none items-center select-none data-[orientation=vertical]:flex-col"
    thumb-alignment="contain"
  >
    <SliderTrack
      class="relative grow overflow-hidden rounded-md bg-muted data-[orientation=vertical]:w-3"
      :style="{ backgroundImage: hueGradient }"
    >
      <SliderRange class="absolute bg-transparent" />
    </SliderTrack>

    <SliderThumb
      class="block h-2 w-5 cursor-pointer rounded-sm border border-border/50 bg-white shadow ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>

<script lang="ts" setup>
  import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";

  const ctx = inject(COLOR_PICKER_CTX);
  if (!ctx) throw new Error("UiColorPickerHue must be used inside UiColorPickerRoot");

  const hueModel = computed<number[]>({
    get: () => [ctx.hue.value],
    set: (val) => ctx.setHue(val?.[0] ?? 0),
  });

  const hueGradient =
    "linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";
</script>
