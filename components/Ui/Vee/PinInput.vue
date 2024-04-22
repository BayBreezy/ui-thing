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
        v-bind="{
          ...$attrs,
          ...reactiveOmit(props, 'label', 'hint', 'id', 'rules', 'validateOnMount', 'modelValue'),
        }"
        v-model="value"
        @complete="emits('complete', $event)"
      />
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
  import type { PinInputRootProps } from "radix-vue";

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
  }>();

  const inputId = props.id || useId();

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue || [],
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
