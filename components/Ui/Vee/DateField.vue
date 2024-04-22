<template>
  <div class="w-full">
    <UiLabel
      :for="inputId"
      v-if="label"
      :hint="labelHint"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ label }} <span class="text-destructive" v-if="required">*</span></span></UiLabel
    >
    <DateField v-bind="{ ...$attrs, ...props }" v-model="value" />
    <TransitionSlide group tag="div">
      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">
        {{ hint }}
      </p>

      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts" setup>
  import type { DateFieldRootProps } from "radix-vue";

  const props = defineProps<
    DateFieldRootProps & {
      label?: string;
      labelHint?: string;
      hint?: string;
      disabled?: boolean;
      modelValue?: string;
      name?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      placeholder?: string;
      required?: boolean;
      separator?: string;
      separatorIcon?: string;
    }
  >();

  const inputId = props.id || useId();

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
