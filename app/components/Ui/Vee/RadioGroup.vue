<template>
  <div :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot name="label" :error-message="errorMessage" :value="value">
      <UiLabel v-if="label" class="mb-5 leading-none" :class="[errorMessage && 'text-destructive']"
        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
      >
    </slot>
    <UiRadioGroup v-bind="{ ...forwarded, ...$attrs }" v-model="value">
      <slot />
    </UiRadioGroup>
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
  import { useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { RadioGroupRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const props = defineProps<
    RadioGroupRootProps & {
      label?: string;
      hint?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      class?: HTMLAttributes["class"];
      name: string;
    }
  >();

  const forwarded = useForwardProps(props);
  const styles = tv({
    base: "flex flex-col",
  });

  defineOptions({ inheritAttrs: false });

  const { errorMessage, value } = useField(() => props.name, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    type: "radio",
    syncVModel: true,
  });
</script>
