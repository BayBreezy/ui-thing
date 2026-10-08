<template>
  <div :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot name="label" :error-message="errorMessage" :value="value">
      <UiLabel
        v-if="label"
        :id="labelId"
        :hint="labelHint"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
      >
    </slot>
    <UiRating
      :id="inputId"
      v-bind="$attrs"
      role="group"
      editable
      :name="name"
      :disabled="disabled"
      :model-value="value"
      :aria-labelledby="label ? labelId : undefined"
      :aria-describedby="errorMessage ? errorId : hint ? hintId : undefined"
      :aria-required="required || undefined"
      :aria-invalid="errorMessage ? true : undefined"
      @update:model-value="handleChange"
      @focusout="onFocusOut"
    />
    <AnimatePresence multiple as="div" mode="wait">
      <slot name="hint" :error-message="errorMessage" :value>
        <motion.p
          v-if="hint && !errorMessage"
          :id="hintId"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="text-muted-foreground mt-1.5 text-sm"
        >
          {{ hint }}
        </motion.p>
      </slot>
      <slot name="errorMessage" :error-message="errorMessage" :value>
        <motion.p
          v-if="errorMessage"
          :id="errorId"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="text-destructive mt-1.5 text-sm"
        >
          {{ errorMessage }}
        </motion.p>
      </slot>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  import { AnimatePresence, motion } from "motion-v";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const props = defineProps<{
    label?: string;
    labelHint?: string;
    hint?: string;
    modelValue?: number;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    /** Shows the required asterisk and sets `aria-required`. Add a rule to enforce it. */
    required?: boolean;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>();

  // Every other attribute (`max-rating`, `step`, `clearable`, `icon`, `size`, `show-value`...) is
  // forwarded to `UiRating`.
  defineOptions({ inheritAttrs: false });

  const inputId = props.id || useId();
  const labelId = `${inputId}-label`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const styles = tv({
    base: "w-full",
  });

  const { errorMessage, value, handleChange, handleBlur } = useField(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true,
    }
  );

  // Only mark the field as touched once focus leaves the whole rating, not when moving between stars.
  const onFocusOut = (event: FocusEvent) => {
    const target = event.currentTarget as HTMLElement | null;
    if (!target?.contains(event.relatedTarget as Node | null)) handleBlur(event);
  };
</script>
