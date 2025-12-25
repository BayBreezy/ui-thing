<template>
  <div class="w-full">
    <UiLabel
      v-if="label"
      :for="inputId"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UiTagsInput
        v-model="value"
        :required="required"
        :name="name"
        :disabled="disabled"
        v-bind="$attrs"
        :class="[hasIcon && 'pl-9', 'h-auto p-1']"
      >
        <UiTagsInputItem
          v-for="tag in value"
          :key="tag"
          :aria-invalid="!!errorMessage"
          :value="tag"
        />
        <UiTagsInputInput
          :id="inputId"
          class="dark:bg-transparent"
          :aria-invalid="!!errorMessage"
          :placeholder="placeholder"
        />
      </UiTagsInput>
    </div>
    <AnimatePresence multiple as="div" mode="wait">
      <slot name="hint" :error-message="errorMessage" :value>
        <motion.p
          v-if="hint && !errorMessage"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="mt-1.5 text-sm text-muted-foreground"
        >
          {{ hint }}
        </motion.p>
      </slot>
      <slot name="errorMessage" :error-message="errorMessage" :value>
        <motion.p
          v-if="errorMessage"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="mt-1.5 text-sm text-destructive"
        >
          {{ errorMessage }}
        </motion.p>
      </slot>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  import { AnimatePresence, motion } from "motion-v";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const props = defineProps<{
    label?: string;
    icon?: string;
    hint?: string;
    disabled?: boolean;
    modelValue?: string[];
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }>();

  const inputId = props.id || useId();

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
