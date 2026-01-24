<template>
  <div
    v-if="ctx.showPresets.value && ctx.presets.value.length"
    data-slot="color-picker-presets"
    class="mt-3"
  >
    <RovingFocusGroup
      class="flex flex-wrap gap-1.5"
      orientation="horizontal"
      loop
      :prevent-scroll-on-entry-focus="true"
      :default-current-tab-stop-id="defaultTabStopId"
    >
      <RovingFocusItem
        v-for="(preset, index) in ctx.presets.value"
        :key="`${preset}-${index}`"
        as-child
        :tab-stop-id="tabStopId(index)"
        :active="tabStopId(index) === defaultTabStopId"
        :allow-shift-key="true"
      >
        <button
          type="button"
          class="size-6 rounded border border-input shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          :style="{ backgroundColor: preset }"
          :aria-label="`Preset ${preset}`"
          @click="ctx.setFromString(preset)"
        />
      </RovingFocusItem>
    </RovingFocusGroup>
  </div>
</template>

<script lang="ts" setup>
  import { colord } from "colord";
  import { RovingFocusGroup, RovingFocusItem } from "reka-ui";

  const ctx = inject(COLOR_PICKER_CTX);
  if (!ctx) throw new Error("UiColorPickerPresets must be used inside UiColorPickerRoot");

  const tabStopId = (index: number) => `preset-${index}`;

  // Prefer focusing the swatch that matches the current color (best-effort).
  // Falls back to the first swatch.
  const defaultTabStopId = computed(() => {
    const current = ctx.currentColor.value;
    const idx = ctx.presets.value.findIndex((p) => {
      const c = colord(p);
      if (!c.isValid()) return false;

      // Compare RGB (ignore alpha) so presets without AA can still match.
      const a = c.toRgb();
      const b = current.alpha(1).toRgb();

      return a.r === b.r && a.g === b.g && a.b === b.b;
    });

    return tabStopId(Math.max(0, idx));
  });
</script>
