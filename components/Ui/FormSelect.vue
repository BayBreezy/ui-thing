<template>
  <div class="w-full">
    <UiLabel :for="inputId" v-if="label" :class="[errorMessage && 'text-destructive', 'mb-2']">{{
      label
    }}</UiLabel>
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute">
          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground" />
        </span>
      </slot>
      <UiSelect
        :disabled="disabled"
        :required="required"
        :name="name"
        v-model="value"
        v-bind="$attrs"
      >
        <slot>
          <slot name="trigger">
            <UiSelectTrigger :placeholder="placeholder" :id="inputId" />
          </slot>
          <slot name="content"></slot>
        </slot>
      </UiSelect>
    </div>
    <p class="mt-1 text-sm text-muted-foreground animate-in fade-in" v-if="hint && !errorMessage">
      {{ hint }}
    </p>
    <p class="mt-1 text-sm text-destructive animate-in fade-in" v-if="errorMessage">
      {{ errorMessage }}
    </p>
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
    disabled?: boolean;
    required?: boolean;
  }>();

  defineOptions({ inheritAttrs: false });

  const inputId = computed(
    () => props.id || `select-${Math.random().toString(36).substring(2, 9)}`
  );

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
