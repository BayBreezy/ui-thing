<template>
  <div data-slot="color-picker-root" :class="rootClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { colord } from "colord";
  import type { Colord } from "colord";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "w-full",
  });

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      format?: ColorFormat;
      showAlpha?: boolean;
      showFormatToggle?: boolean;
      showInput?: boolean;
      showPresets?: boolean;
      presets?: string[];
      class?: HTMLAttributes["class"];
    }>(),
    {
      modelValue: "#ff5733",
      format: "hex",
      showAlpha: false,
      showFormatToggle: true,
      showInput: true,
      showPresets: false,
      presets: () => [],
    }
  );

  const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:format": [format: ColorFormat];
  }>();

  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
  const clamp01 = (n: number) => clamp(n, 0, 1);
  const clampHue = (n: number) => {
    const x = n % 360;
    return x < 0 ? x + 360 : x;
  };

  const rootClass = computed(() => styles({ class: props.class }));

  const hue = ref(0);
  const saturation = ref(100);
  const value = ref(100);
  const alpha = ref(1);

  const internalFormat = ref<ColorFormat>(props.format);

  watch(
    () => props.format,
    (f) => (internalFormat.value = f)
  );
  watch(internalFormat, (f) => emit("update:format", f));

  const showAlpha = computed(() => !!props.showAlpha);
  const showFormatToggle = computed(() => !!props.showFormatToggle);
  const showInput = computed(() => !!props.showInput);
  const showPresets = computed(() => !!props.showPresets);
  const presets = computed(() => props.presets ?? []);

  const currentColor = computed<Colord>(() => {
    const c = colord({ h: hue.value, s: saturation.value, v: value.value });
    return showAlpha.value ? c.alpha(alpha.value) : c;
  });

  // Always #rrggbbaa when alpha enabled (including ff)
  const hexRrggbbaa = (c: Colord) => {
    const rrggbb = c.alpha(1).toHex().slice(1).toLowerCase();
    const aa = Math.round(clamp01(alpha.value) * 255)
      .toString(16)
      .padStart(2, "0")
      .toLowerCase();
    return `#${rrggbb}${aa}`;
  };

  const colorString = computed(() => {
    switch (internalFormat.value) {
      case "hex":
        return showAlpha.value
          ? hexRrggbbaa(currentColor.value)
          : currentColor.value.toHex().toLowerCase();
      case "rgb":
        return currentColor.value.toRgbString();
      case "hsl":
        return currentColor.value.toHslString();
      case "hsv": {
        const hsv = currentColor.value.toHsv();
        return `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`;
      }
      default:
        return showAlpha.value
          ? hexRrggbbaa(currentColor.value)
          : currentColor.value.toHex().toLowerCase();
    }
  });

  const initializeFromValue = (input: string) => {
    const c = colord(input);
    if (!c.isValid()) return;

    const hsv = c.toHsv();
    hue.value = clampHue(hsv.h);
    saturation.value = clamp(hsv.s, 0, 100);
    value.value = clamp(hsv.v, 0, 100);
    alpha.value = clamp01(c.alpha());
  };

  const normalize = (s: string) => s.trim().toLowerCase();

  // This is the key stutter fix
  const suppressEmit = ref(false);
  const lastEmitted = ref<string | null>(null);

  watch(
    () => colorString.value,
    (val) => {
      if (suppressEmit.value) return;
      lastEmitted.value = normalize(val);
      emit("update:modelValue", val);
    }
  );

  watch(
    () => props.modelValue,
    async (val) => {
      if (!val) return;

      // Ignore parent reflection of our own emitted value
      if (lastEmitted.value && normalize(val) === lastEmitted.value) return;

      suppressEmit.value = true;
      initializeFromValue(val);
      await nextTick();
      suppressEmit.value = false;
    },
    { immediate: true }
  );

  // actions for children
  const setFromString = (input: string) => initializeFromValue(input);

  const setSV01 = (s01: number, v01: number) => {
    saturation.value = clamp(s01, 0, 1) * 100;
    value.value = clamp(v01, 0, 1) * 100;
  };

  const stepSV = (ds: number, dv: number) => {
    saturation.value = clamp(saturation.value + ds, 0, 100);
    value.value = clamp(value.value + dv, 0, 100);
  };

  const setHue = (h: number) => {
    hue.value = clampHue(h);
  };

  const setAlpha = (a: number) => {
    alpha.value = clamp01(a);
  };

  const ctx: ColorPickerContext = {
    hue,
    saturation,
    value,
    alpha,
    internalFormat,

    showAlpha,
    showFormatToggle,
    showInput,
    showPresets,
    presets,

    currentColor,
    colorString,

    setFromString,
    setSV01,
    stepSV,
    setHue,
    setAlpha,
  };

  provide(COLOR_PICKER_CTX, ctx);
</script>
