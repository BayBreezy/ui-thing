<template>
  <div class="w-full">
    <UiLabel
      :for="inputId"
      v-if="label"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      >{{ label }}</UiLabel
    >
    <div class="relative">
      <UiPinInput
        @complete="emits('complete', $event)"
        :id="inputId"
        v-bind="{
          ...$attrs,
          ...reactiveOmit(props, 'label', 'hint', 'id', 'rules', 'validateOnMount', 'modelValue'),
        }"
        v-model="value"
      />
    </div>
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
