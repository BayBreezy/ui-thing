<template>
  <div>
    <div
      :class="
        nativeCheckboxStyles().wrapper({ class: normalizeClass(props.wrapperClass) || undefined })
      "
    >
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
            class: normalizeClass(props.class) || undefined,
          })
        "
        v-bind="{ ...forwarded, ...$attrs }"
        @change="handleChange"
        @input="handleChange"
      />
      <label
        v-if="hasLabel || hasDescription || errorMessage"
        :for="inputId"
        class="flex flex-col gap-1 text-sm leading-[1.25]"
      >
        <slot name="label">
          <span
            v-if="label"
            :class="
              nativeCheckboxStyles().label({
                disabled,
                class: normalizeClass(props.labelClass) || undefined,
              })
            "
            >{{ label }}</span
          >
        </slot>
        <slot name="description">
          <span
            v-if="description"
            :class="
              nativeCheckboxStyles().description({
                disabled,
                class: normalizeClass(props.descriptionClass) || undefined,
              })
            "
            >{{ description }}</span
          >
        </slot>
        <AnimatePresence>
          <motion.p
            v-if="errorMessage"
            :variants
            initial="initial"
            exit="initial"
            animate="animate"
            :transition="{ type: 'keyframes' }"
            :class="nativeCheckboxStyles().error({ disabled })"
          >
            {{ errorMessage }}
          </motion.p>
        </AnimatePresence>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { motion } from "motion-v";
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { badgeColorClasses, badgeColors } from "~/utils/badge-colors";
  import type { BadgeColor } from "~/utils/badge-colors";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };
  // The border, the check (`text-*` is the color of the check) and the focus ring come from the
  // classes shared with the badge
  const checkboxColors = Object.fromEntries(
    badgeColors.map((c) => [
      c,
      {
        checkbox: [
          badgeColorClasses[c].border,
          badgeColorClasses[c].accent,
          badgeColorClasses[c].focusRing,
        ].join(" "),
      },
    ])
  ) as Record<BadgeColor, { checkbox: string }>;

  export const nativeCheckboxStyles = tv({
    slots: {
      checkbox:
        "peer form-checkbox border-input bg-background focus:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 shrink-0 cursor-pointer rounded-[4px] border shadow-xs transition duration-200 focus:ring-[3px] focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      label: "cursor-pointer font-medium",
      description: "text-muted-foreground text-pretty",
      wrapper: "flex items-start gap-3",
      error: "text-destructive",
    },
    variants: {
      size: { sm: { checkbox: "size-3.5" }, md: { checkbox: "size-4" } },
      color: checkboxColors,
      error: {
        true: { checkbox: "border-destructive text-destructive focus:ring-destructive/30" },
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
    /** Custom class(es) to add to the element. */
    class?: HTMLAttributes["class"];
    /** Custom class(es) to add to the label element. */
    labelClass?: HTMLAttributes["class"];
    /** Custom class(es) to add to the description element. */
    descriptionClass?: HTMLAttributes["class"];
    /** Custom class(es) to add to the wrapper element. */
    wrapperClass?: HTMLAttributes["class"];
    /** The id of the checkbox input element. */
    id?: string;
    /** The v-model binding for the checkbox. */
    modelValue?: any;
    /** The name of the checkbox input element. */
    name?: string;
    /** The value of the checkbox input element. */
    value?: any;
    /** Whether the checkbox is disabled. */
    disabled?: boolean;
    /** Whether the checkbox is required. */
    required?: boolean;
    /** Whether the checkbox is indeterminate. */
    indeterminate?: boolean;
    /**
     * The color variant of the checkbox.
     *
     * @default blue
     */
    color?: VariantProps<typeof nativeCheckboxStyles>["color"];
    /**
     * The size variant of the checkbox.
     *
     * @default md
     */
    size?: VariantProps<typeof nativeCheckboxStyles>["size"];
    /** The label for the checkbox. */
    label?: string;
    /** The description for the checkbox. */
    description?: string;
    /** The validation rules for the checkbox. */
    rules?: any;
    /** Whether to validate the checkbox on mount. */
    validateOnMount?: boolean;
    /** The value to use when the checkbox is unchecked. */
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
