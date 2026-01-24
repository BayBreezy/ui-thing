<template>
  <SliderRoot
    v-model="alphaModel"
    data-slot="color-picker-alpha"
    orientation="horizontal"
    :min="0"
    :max="1"
    :step="0.01"
    class="relative flex w-full touch-none items-center select-none"
    thumb-alignment="contain"
  >
    <SliderTrack class="relative h-3 w-full grow overflow-hidden rounded-md bg-muted">
      <!-- checkerboard -->
      <div
        class="bg-[linear-gradient(45deg,rgba(255,255,255,.18)_25%,transparent_25%,transparent_75%,rgba(255,255,255,.18)_75%,rgba(255,255,255,.18)), linear-gradient(45deg,rgba(255,255,255,.18)_25%,transparent_25%,transparent_75%,rgba(255,255,255,.18)_75%,rgba(255,255,255,.18))] absolute inset-0 bg-size-[12px_12px] bg-position-[0_0,6px_6px] opacity-60"
      />
      <!-- alpha gradient overlay -->
      <div
        class="absolute inset-0"
        :style="{ background: `linear-gradient(to right, transparent, ${solidRgb})` }"
      />

      <SliderRange class="absolute bg-transparent" />
    </SliderTrack>

    <SliderThumb
      class="block h-5 w-2 cursor-pointer rounded-sm border border-border/50 bg-white shadow ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>

<script lang="ts" setup>
  import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";

  const ctx = inject(COLOR_PICKER_CTX);
  if (!ctx) throw new Error("[ColorPickerAlpha] must be used inside ColorPickerRoot component");

  const alphaModel = computed<number[]>({
    get: () => [ctx.alpha.value],
    set: (val) => ctx.setAlpha(val?.[0] ?? 1),
  });

  const solidRgb = computed(() => ctx.currentColor.value.alpha(1).toRgbString());
</script>
