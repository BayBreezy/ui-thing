<template>
  <div class="w-full">
    <UiLabel
      v-if="label"
      :for="inputId"
      :hint="labelHint"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <div class="relative">
      <UiNumberField
        v-bind="($attrs, props)"
        :id="inputId"
        v-model="value"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!errorMessage"
        :name="name"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </UiNumberField>
    </div>
    <AnimatePresence as="div" multiple mode="wait">
      <motion.p
        v-if="hint && !errorMessage"
        :variants
        initial="initial"
        exit="initial"
        animate="animate"
        :transition="{ type: 'keyframes' }"
        class="text-muted-foreground mt-1.5 text-sm"
      >
        {{ hint }}
      </motion.p>

      <motion.p
        v-if="errorMessage"
        :variants
        initial="initial"
        exit="initial"
        animate="animate"
        :transition="{ type: 'keyframes' }"
        class="text-destructive mt-1.5 text-sm"
      >
        {{ errorMessage }}
      </motion.p>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  import { motion } from "motion-v";
  import type { NumberFieldRootProps } from "reka-ui";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  interface Props extends NumberFieldRootProps {
    /** The label to display above the field. */
    label?: string;
    /** The label hint to display next to the label. */
    labelHint?: string;
    /** Hint to display below the input field. */
    hint?: string;
    /** Whether the field is disabled. */
    disabled?: boolean;
    /** The name of the field, used for form submission. */
    name?: string;
    /** The id of the input element. */
    id?: string;
    /** Rules for the field validation. */
    rules?: any;
    /** Whether to validate the field on mount. */
    validateOnMount?: boolean;
    /** Whether the field is required. */
    required?: boolean;
  }
  const props = defineProps<Props>();

  const inputId = computed(() => props.id || useId());

  const { errorMessage, value } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
