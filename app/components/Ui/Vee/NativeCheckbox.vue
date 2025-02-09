<template>
  <div>
    <div :class="nativeCheckboxStyles().wrapper({ class: props.wrapperClass })">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <input
        :id="inputId"
        :checked="checked"
        type="checkbox"
        :data-indeterminate="indeterminate"
        :data-checked="checked"
        :data-disabled="disabled"
        :data-required="required"
        :class="
          nativeCheckboxStyles().checkbox({
            error: !!errorMessage,
            disabled,
            size,
            color,
            class: props.class,
          })
        "
        v-bind="{ ...forwarded, ...$attrs }"
        @change="handleChange"
        @input="handleChange"
      />
      <label
        v-if="hasLabel || hasDescription || errorMessage"
        :for="inputId"
        class="flex flex-col gap-1 text-sm leading-none"
      >
        <slot name="label">
          <span
            v-if="label"
            :class="nativeCheckboxStyles().label({ disabled, class: props.labelClass })"
            >{{ label }}</span
          >
        </slot>
        <slot name="description">
          <span
            v-if="description"
            :class="nativeCheckboxStyles().description({ disabled, class: props.descriptionClass })"
            >{{ description }}</span
          >
        </slot>
        <TransitionSlide tag="template">
          <p v-if="errorMessage" :class="nativeCheckboxStyles().error({ disabled })">
            {{ errorMessage }}
          </p>
        </TransitionSlide>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import type { VariantProps } from "tailwind-variants";

  export const nativeCheckboxStyles = tv({
    slots: {
      checkbox:
        "peer form-checkbox shrink-0 cursor-pointer rounded-sm border border-primary bg-background outline-none ring-offset-background transition duration-200 focus:ring-offset-background",
      label: "cursor-pointer font-medium",
      description: "text-pretty text-muted-foreground",
      wrapper: "flex items-start gap-3",
      error: "text-destructive",
    },
    variants: {
      size: { sm: { checkbox: "size-4" }, md: { checkbox: "size-[18px]" } },
      color: {
        red: { checkbox: "border-red-500 text-red-500 focus:ring-red-500" },
        orange: { checkbox: "border-orange-500 text-orange-500 focus:ring-orange-500" },
        amber: { checkbox: "border-amber-500 text-amber-500 focus:ring-amber-500" },
        yellow: { checkbox: "border-yellow-500 text-yellow-500 focus:ring-yellow-500" },
        lime: { checkbox: "border-lime-500 text-lime-500 focus:ring-lime-500" },
        green: { checkbox: "border-green-500 text-green-500 focus:ring-green-500" },
        emerald: { checkbox: "border-emerald-500 text-emerald-500 focus:ring-emerald-500" },
        teal: { checkbox: "border-teal-500 text-teal-500 focus:ring-teal-500" },
        cyan: { checkbox: "border-cyan-500 text-cyan-500 focus:ring-cyan-500" },
        sky: { checkbox: "border-sky-500 text-sky-500 focus:ring-sky-500" },
        blue: { checkbox: "border-blue-500 text-blue-500 focus:ring-blue-500" },
        indigo: { checkbox: "border-indigo-500 text-indigo-500 focus:ring-indigo-500" },
        violet: { checkbox: "border-violet-500 text-violet-500 focus:ring-violet-500" },
        purple: { checkbox: "border-purple-500 text-purple-500 focus:ring-purple-500" },
        fuchsia: { checkbox: "border-fuchsia-500 text-fuchsia-500 focus:ring-fuchsia-500" },
        pink: { checkbox: "border-pink-500 text-pink-500 focus:ring-pink-500" },
        rose: { checkbox: "border-rose-500 text-rose-500 focus:ring-rose-500" },
        slate: { checkbox: "border-slate-600 text-slate-600 focus:ring-slate-600" },
        gray: { checkbox: "border-gray-600 text-gray-600 focus:ring-gray-600" },
        zinc: { checkbox: "border-zinc-600 text-zinc-600 focus:ring-zinc-600" },
        neutral: { checkbox: "border-neutral-600 text-neutral-600 focus:ring-neutral-600" },
        stone: { checkbox: "border-stone-600 text-stone-600 focus:ring-stone-600" },
      },
      error: {
        true: { checkbox: "border-destructive text-destructive focus:ring-destructive" },
      },
      disabled: {
        true: {
          checkbox: "pointer-events-none opacity-50",
          label: "cursor-not-allowed opacity-50",
          description: "cursor-not-allowed opacity-50",
          error: "cursor-not-allowed opacity-70",
        },
      },
    },
    defaultVariants: {
      color: "blue",
      size: "md",
    },
  });

  export type NativeCheckboxProps = {
    /** Custom class(es) to add to the element */
    class?: any;
    /** Custom class(es) to add to the label element */
    labelClass?: any;
    /** Custom class(es) to add to the description element */
    descriptionClass?: any;
    /** Custom class(es) to add to the wrapper element */
    wrapperClass?: any;
    /** The id of the checkbox input element */
    id?: string;
    /** The v-model binding for the checkbox */
    modelValue?: any;
    /** The name of the checkbox input element */
    name?: string;
    /** The value of the checkbox input element */
    value?: any;
    /** Whether the checkbox is disabled */
    disabled?: boolean;
    /** Whether the checkbox is required */
    required?: boolean;
    /** Whether the checkbox is indeterminate */
    indeterminate?: boolean;
    /**
     * The color variant of the checkbox
     *
     * @default blue
     */
    color?: VariantProps<typeof nativeCheckboxStyles>["color"];
    /**
     * The size variant of the checkbox
     *
     * @default md
     */
    size?: VariantProps<typeof nativeCheckboxStyles>["size"];
    /** The label for the checkbox */
    label?: string;
    /** The description for the checkbox */
    description?: string;
    /** The validation rules for the checkbox */
    rules?: any;
    /** Whether to validate the checkbox on mount */
    validateOnMount?: boolean;
    /** The value to use when the checkbox is unchecked */
    unCheckedValue?: any;
  };
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<NativeCheckboxProps>(), {});
  const inputId = props.id || `checkbox-${useId()}`;

  const forwarded = reactiveOmit(
    props,
    "class",
    "id",
    "modelValue",
    "label",
    "description",
    "color",
    "size",
    "labelClass",
    "descriptionClass",
    "wrapperClass",
    "rules",
    "validateOnMount",
    "unCheckedValue"
  );
  const slots = useSlots();
  const hasLabel = computed(() => !!slots.label || !!props.label);
  const hasDescription = computed(() => !!slots.description || !!props.description);

  const { errorMessage, checked, handleChange } = useField(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      syncVModel: true,
      label: props.label,
      validateOnMount: props.validateOnMount,
      type: "checkbox",
      checkedValue: props.value || true,
      uncheckedValue: props.unCheckedValue || false,
    }
  );
</script>
