<template>
  <div class="w-full">
    <UiLabel :for="inputId" v-if="label" :class="[errorMessage && 'text-destructive', 'mb-2']">{{
      label
    }}</UiLabel>
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute left-3 top-3 flex items-center justify-center">
          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UiTextarea
        :rows="rows"
        v-model="value"
        @blur="handleBlur"
        :id="inputId"
        :name="name"
        v-bind="$attrs"
        :class="[hasIcon && 'pl-9']"
        :placeholder="placeholder"
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
    rows?: number;
  }>();

  const inputId = props.id || useId();

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
