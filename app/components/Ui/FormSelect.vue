<template>
  <div class="w-full">
    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && 'text-destructive', 'mb-2']">{{
      label
    }}</UiLabel>
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute">
          <Icon v-if="icon" :name="icon" class="text-muted-foreground size-4" />
        </span>
      </slot>
      <UiSelect
        v-model="value"
        :disabled="disabled"
        :required="required"
        :name="name"
        v-bind="$attrs"
      >
        <slot>
          <slot name="trigger">
            <UiSelectTrigger :id="inputId" :placeholder="placeholder" />
          </slot>
          <slot name="content" />
        </slot>
      </UiSelect>
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
          class="text-muted-foreground mt-1.5 text-sm"
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

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const props = defineProps<{
    label?: string;
    icon?: string;
    hint?: string;
    modelValue?: string;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
  }>();

  defineOptions({ inheritAttrs: false });

  const inputId = computed(() => props.id || useId());

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
