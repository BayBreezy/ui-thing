<template>
  <div :id="colorPalette.name" class="scroll-mt-20 rounded-lg">
    <div class="flex items-center px-4">
      <div class="flex-1 pl-1 text-sm font-medium">
        <h2 class="capitalize">{{ colorPalette.name }}</h2>
      </div>
      <ColorPaletteColorFormatSelector
        v-model="currentFormat"
        :color="colorPalette.colors[0]!"
        class="ml-auto"
      />
    </div>
    <div class="flex flex-col gap-4 py-4 sm:flex-row sm:gap-2">
      <ColorPaletteColor v-for="color in colorPalette.colors" :key="color.hex" :color />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useStorage } from "@vueuse/core";

  import type { ColorPalette } from "~/utils/registry/colors";

  defineProps<{
    colorPalette: ColorPalette;
  }>();

  const currentFormat = useStorage("ui-things-color-format", "hex");
</script>
