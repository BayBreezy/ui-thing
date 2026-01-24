<template>
  <div data-slot="color-picker-controls" class="mt-3 flex items-center gap-2">
    <div
      class="h-9 w-12 shrink-0 rounded-md shadow-xs ring-1 ring-border/40"
      :style="previewStyle"
    />

    <UiSelect v-if="ctx.showFormatToggle.value" v-model="ctx.internalFormat.value">
      <UiSelectTrigger class="h-9 w-24">
        <UiSelectValue />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="hex">HEX</UiSelectItem>
        <UiSelectItem value="rgb">RGB</UiSelectItem>
        <UiSelectItem value="hsl">HSL</UiSelectItem>
        <UiSelectItem value="hsv">HSV</UiSelectItem>
      </UiSelectContent>
    </UiSelect>

    <UiInput
      v-if="ctx.showInput.value"
      :model-value="ctx.colorString.value"
      class="h-9 flex-1 font-mono text-xs"
      @update:model-value="onInput"
      @blur="onBlur"
    />
  </div>
</template>

<script lang="ts" setup>
  const ctx = inject(COLOR_PICKER_CTX);
  if (!ctx) throw new Error("[ColorPickerControls] must be used inside ColorPickerRoot component");

  const previewStyle = computed(() => {
    const rgb = ctx.currentColor.value.toRgbString();

    // Always set a base color so the box is never blank
    if (!ctx.showAlpha.value) return { backgroundColor: rgb };

    return {
      backgroundColor: rgb,
      backgroundImage: `
      repeating-linear-gradient(45deg, hsl(var(--muted-foreground) / 0.25) 0, hsl(var(--muted-foreground) / 0.25) 2px, transparent 0, transparent 50%),
      repeating-linear-gradient(-45deg, hsl(var(--muted-foreground) / 0.25) 0, hsl(var(--muted-foreground) / 0.25) 2px, transparent 0, transparent 50%)
    `,
      backgroundSize: "8px 8px, 8px 8px",
      backgroundPosition: "0 0, 4px 4px",
    } as Record<string, string>;
  });

  const onInput = (val: string) => {
    ctx.setFromString(val);
  };

  const onBlur = () => {
    // Keeps whatever format is selected (hex outputs #rrggbbaa when alpha is enabled)
    ctx.setFromString(ctx.colorString.value);
  };
</script>
