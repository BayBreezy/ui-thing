<template>
  <div class="w-full">
    <UiLabel
      v-if="label"
      :for="inputId"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <Slider v-bind="{ ...forwarded, ...$attrs }" v-model="model" />
    <TransitionSlide group tag="div">
      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">
        {{ hint }}
      </p>

      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts">
  import Slider from "@vueform/slider";
  import { useForwardPropsEmits } from "radix-vue";

  export type SliderFormatObject = {
    /**
     * Prefix to prepend to the value.
     * @example "$"
     */
    prefix?: string;
    /**
     * Suffix to append to the value.
     * @example "USD"
     */
    suffix?: string;
    /**
     * Number of decimals to show.
     * @example 2
     */
    decimals?: number;
    /**
     * Character to use as thousand separator.
     * @example ","
     */
    thousand?: string;
  };

  export interface SliderProps {
    /**
     * The hint to display below the slider.
     */
    hint?: string;
    /**
     * The rules for the slider. Used with vee-validate for validation.
     */
    rules?: any;
    /**
     * Whether the slider should be validated on mount.
     */
    validateOnMount?: boolean;
    /**
     * The label of the slider. Used with vee-validate for error messages
     */
    label?: string;
    /**
     * The name we want to give this slider in the form.
     */
    name?: string;
    /**
     * The id attribute of slider container DOM.
     * @default "slider"
     */
    id?: string;
    /**
     * Whether to update v-model only when the slider value is set and not while dragging.
     *
     * If disabled you must not use inline objects as props (eg. format, options, classes) but outsource them to a data property.
     *
     * @default true
     */
    lazy?: boolean;
    /**
     * Whether the slider should be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Minimum value of the slider.
     * @default 0
     */
    min?: number;
    /**
     * Maximum value of the slider.
     * @default 100
     */
    max?: number;
    /**
     * The jump between intervals. If `-1` it enables fractions (eg. `1.23`).
     * @default 1
     */
    step?: number;
    /**
     * Whether tooltips should show above handlers.
     * @default true
     */
    tooltips?: boolean;
    /**
     * When tooltips should be shown.
     * @default "always"
     */
    showTooltip?: "always" | "focus" | "drag";
    /**
     * The step distance between two handles when their tooltips should be merged (when step is `-1` then `1` is assumed).
     *
     * @example
     *
     * ```js
     * { merge: 5, step: 10 }
     * // values: 0, <=50 will merge
     * // values: 0, 60 will not merge
     *
     * { merge: 5, step: -1 }
     *
     * // values: 0, <=5 will merge
     * // values: 0, 5.01 will not merge
     *
     * ```
     * @default -1
     */
    merge?: number;
    /**
     * Formats the tooltip.
     *
     * It can be either a function that receives a `value` param and expects a string or number as return or an object with the following properties:
     *
     *
     * prefix - eg $ -> $100
     *
     * suffix - eg USD -> 100USD
     *
     * decimals - eg 2 -> 100.00
     *
     * thousand - eg , - 1,000
     */
    format?: SliderFormatObject | ((value: number) => string | number);
    /**
     * The orientation of the slider.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The direction of the slider.
     *
     * By default value increases left-to-right and top-to-bottom, which is reversed when using `rtl`.
     *
     * @default "ltr"
     */
    direction?: "ltr" | "rtl";
    /**
     * The position of the slider tooltips.
     *
     * Possible values: `null` | `top` | `bottom` | `left` | `right` depending on orientation prop.
     *
     * When null it equals to orientation default (`top` for `horizontal` and `left` for `vertical`).
     * @default null
     */
    tooltipPosition?: null | "top" | "bottom" | "left" | "right";
    /**
     * An object containing aria attributes to be added for each handle.
     */
    aria?: Record<string, any>;
    /**
     * Sets the aria-labelledby attribute of handles.
     */
    ariaLabelledby?: string;
    /**
     * Additional options for noUiSlider.
     * @see https://refreshless.com/nouislider/slider-options/
     */
    options?: Record<string, any>;
    /**
     * Initial value of the slider.
     */
    modelValue?: any;
    value?: any;
    /**
     * An object of class names that gets merged with the default values
     */
    classes?: Record<string, any>;
    /**
     * Whether the slider is required.
     *
     * @default false
     */
    required?: boolean;
  }

  export type SliderEmits = {
    /**
     * Emitted when dragging the slider is finished or it's value changed by clicking, keyboard or programmatically set.
     */
    change: [v: any];
    /**
     * Emitted in the same scenarios as in `@change`, but also when the slider is being dragged if `lazy` option is disabled.
     */
    update: [v: any];
    /**
     * Emitted in the same scenarios as in `@change`, but also when the slider's `.set()` method is called.
     */
    set: [v: any];
    /**
     * Emitted while the slider moves.
     */
    slide: [v: any];
    /**
     * Emitted the slider connect moves while dragging.
     */
    drag: [v: any];
    /**
     * Emitted when the handle is activated and dragging started.
     */
    start: [v: any];
    /**
     * Emitted when the dragging ended.
     */
    end: [v: any];
    /**
     * Emitted when the slider's value is updated.
     */
    "update:modelValue": [v: any];
  };
</script>
<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<SliderProps>(), {
    showTooltip: "drag",
  });

  const emits = defineEmits<SliderEmits>();

  const inputId = props.id || useId();

  const forwarded = useForwardPropsEmits(props, emits);

  const { errorMessage, value: model } = useField(
    () => props.name || props.id || useId(),
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true,
    }
  );
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
  :root {
    --slider-bg: theme(colors.muted.DEFAULT);
    --slider-connect-bg: theme(colors.primary.DEFAULT);
    --slider-connect-bg-disabled: theme(colors.primary.DEFAULT/45%);
    --slider-height: 8px;
    --slider-vertical-height: 300px;
    --slider-radius: 999999px;

    --slider-handle-bg: #ffffff;
    --slider-handle-border: 0;
    --slider-handle-width: 20px;
    --slider-handle-height: 20px;
    --slider-handle-radius: 99999px;
    --slider-handle-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
    --slider-handle-shadow-active: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.42);
    --slider-handle-ring-width: 3px;
    --slider-handle-ring-color: theme(colors.primary.DEFAULT/20%);

    --slider-tooltip-font-size: 0.875rem;
    --slider-tooltip-line-height: 1.25rem;
    --slider-tooltip-font-weight: 600;
    --slider-tooltip-min-width: 24px;
    --slider-tooltip-bg: theme(colors.primary.DEFAULT);
    --slider-tooltip-bg-disabled: theme(colors.primary.DEFAULT/90%);
    --slider-tooltip-color: theme(colors.primary.foreground);
    --slider-tooltip-radius: theme(borderRadius.sm);
    --slider-tooltip-py: 2px;
    --slider-tooltip-px: 6px;
    --slider-tooltip-arrow-size: 5px;
    --slider-tooltip-distance: 4px;
  }
</style>
