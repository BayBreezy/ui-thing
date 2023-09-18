<template>
  <div class="w-full">
    <UILabel :for="inputId" v-if="label" :class="[errorMessage && 'text-destructive', 'mb-2']">{{
      label
    }}</UILabel>
    <div class="relative">
      <UIOTP
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
    <p
      class="mt-1 text-[13px] text-muted-foreground animate-in fade-in"
      v-if="hint && !errorMessage"
    >
      {{ hint }}
    </p>
    <p class="mt-1 text-[13px] text-destructive animate-in fade-in" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
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

  const inputId = computed(() => props.id || `otp-${Math.random().toString(36).substring(2, 9)}`);

  const emits = defineEmits<{
    change: [any];
    complete: [any];
    ready: [any];
  }>();

  const { errorMessage, value } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
