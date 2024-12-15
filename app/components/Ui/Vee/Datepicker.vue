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
          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UiDatepicker v-bind="datePickerProps" v-model="value">
        <template #header-title="{ title }">
          <div class="inline-flex items-center gap-1">
            {{ title }} <Icon name="lucide:chevron-down" class="h-4 w-4" />
          </div>
        </template>
        <template #default="{ inputValue, inputEvents }">
          <UiInput
            :id="inputId"
            :readonly="readonly"
            :required="required"
            :model-value="inputValue"
            :name="name"
            :disabled="disabled"
            v-bind="$attrs"
            :class="[hasIcon && 'pl-9']"
            :placeholder="placeholder"
            v-on="inputEvents"
          />
        </template>
      </UiDatepicker>
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
  const props = withDefaults(
    defineProps<{
      label?: string;
      icon?: string;
      hint?: string;
      disabled?: boolean;
      modelValue?: any;
      name?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      placeholder?: string;
      readonly?: boolean;
      datePickerProps?: any;
      required?: boolean;
    }>(),
    {
      icon: "lucide:calendar-days",
    }
  );

  const inputId = props.id || useId();

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
