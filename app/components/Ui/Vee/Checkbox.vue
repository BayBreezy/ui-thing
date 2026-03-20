<template>
  <div :class="styles({ class: normalizeClass(props.class) || undefined })">
    <UiCheckbox
      :id="inputId"
      v-bind="$attrs"
      :icon="icon"
      :value="value"
      :name="name"
      :required="required"
      :disabled="disabled"
      :model-value="checked"
      @update:model-value="handleChange"
    />
    <div class="flex flex-col gap-1.5 leading-[1.25]">
      <slot name="label" :error-message="errorMessage" :checked="checked">
        <UiLabel v-if="label" :for="inputId" :class="[errorMessage && 'text-destructive']">{{
          label
        }}</UiLabel>
      </slot>
      <AnimatePresence as="div" multiple mode="wait">
        <slot name="hint" :error-message="errorMessage" :checked="checked">
          <motion.p
            v-if="hint && !errorMessage"
            :variants
            initial="initial"
            exit="initial"
            animate="animate"
            :transition="{ type: 'keyframes' }"
            class="text-sm leading-none text-muted-foreground"
          >
            {{ hint }}
          </motion.p>
        </slot>
        <slot name="errorMessage" :error-message="errorMessage" :checked="checked">
          <motion.p
            v-if="errorMessage"
            :variants
            initial="initial"
            exit="initial"
            animate="animate"
            :transition="{ type: 'keyframes' }"
            class="text-sm leading-none text-destructive"
          >
            {{ errorMessage }}
          </motion.p>
        </slot>
      </AnimatePresence>
    </div>
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
    icon?: string;
    hint?: string;
    modelValue?: any;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    type?: string;
    placeholder?: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>();
  const styles = tv({
    base: "flex gap-3",
  });

  const inputId = props.id || useId();

  const { errorMessage, checked, handleChange } = useField(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      type: "checkbox",
      checkedValue: props.value || true,
      syncVModel: true,
    }
  );
</script>
