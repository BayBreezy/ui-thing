import type { Colord } from "colord";
import type { ComputedRef, InjectionKey, Ref } from "vue";

export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv";

export type ColorPickerContext = {
  // state
  hue: Ref<number>;
  saturation: Ref<number>;
  value: Ref<number>;
  alpha: Ref<number>;
  internalFormat: Ref<ColorFormat>;

  // flags
  showAlpha: ComputedRef<boolean>;
  showFormatToggle: ComputedRef<boolean>;
  showInput: ComputedRef<boolean>;
  showPresets: ComputedRef<boolean>;
  presets: ComputedRef<string[]>;

  // computed
  currentColor: ComputedRef<Colord>;
  colorString: ComputedRef<string>;

  // actions
  setFromString: (input: string) => void;
  setSV01: (s01: number, v01: number) => void; // both 0..1
  stepSV: (ds: number, dv: number) => void; // percent steps
  setHue: (h: number) => void;
  setAlpha: (a: number) => void;
};

export const COLOR_PICKER_CTX: InjectionKey<ColorPickerContext> = Symbol("COLOR_PICKER_CTX");
