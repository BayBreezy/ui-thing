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
        :name="name"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </UiNumberField>
    </div>
    <TransitionSlide group tag="div">
      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">
        {{ hint }}
      </p>

      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts" setup>
  import type { NumberFieldRootProps } from "radix-vue";

  interface Props extends NumberFieldRootProps {
    label?: string;
    labelHint?: string;
    hint?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
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
