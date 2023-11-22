<template>
  <div class="w-full">
    <UiLabel
      :for="inputId"
      v-if="label"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      >{{ label }}</UiLabel
    >
    <div class="relative">
      <UiOtp
        v-model="value"
        v-bind="$attrs"
        :input-classes="inputClasses"
        :separator="separator"
        :num-inputs="numInputs"
        :input-type="inputType"
        :inputmode="inputmode"
        :should-auto-focus="shouldAutoFocus"
        :placeholder="placeholder"
        :is-disabled="disabled"
        @change="emits('change', $event)"
        @complete="emits('complete', $event)"
        @ready="emits('ready', $event)"
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
  import { useId } from "radix-vue";

  const props = defineProps<{
    label?: string;
    hint?: string;
    modelValue?: string;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    numInputs?: number;
    separator?: string;
    inputClasses?: any;
    conditionalClass?: any[];
    inputType?: "number" | "tel" | "letter-numeric" | "password";
    inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    shouldAutoFocus?: boolean;
    placeholder?: string[];
    disabled?: boolean;
  }>();

  defineOptions({ inheritAttrs: false });

  const inputId = useId(props.id);

  const emits = defineEmits<{
    change: [any];
    complete: [any];
    ready: [any];
  }>();

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
