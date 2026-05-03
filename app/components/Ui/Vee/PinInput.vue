<template>
  <div class="w-full">
    <UiLabel
      v-if="label"
      :for="inputId"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <div class="relative">
      <UiPinInput
        :id="inputId"
        v-bind="{ ...$attrs, ...forwarded }"
        v-model="value"
        :aria-invalid="!!errorMessage"
        @complete="emits('complete', $event)"
      />
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
  import type { PinInputRootProps } from "reka-ui";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const props = defineProps<
    Omit<PinInputRootProps, "as" | "asChild"> & {
      label?: string;
      hint?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      separator?: string;
      inputCount?: number;
    }
  >();

  const emits = defineEmits<{
    complete: [value: string[]];
    "update:modelValue": [value: string[]];
  }>();

  const forwarded = reactiveOmit(
    props,
    "label",
    "hint",
    "id",
    "rules",
    "validateOnMount",
    "modelValue"
  );
  const inputId = props.id || useId();

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue || [],
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
