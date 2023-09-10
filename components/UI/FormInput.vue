<template>
  <div class="w-full">
    <UILabel :for="inputId" v-if="label" :class="[errorMessage && 'text-destructive', 'mb-2']">{{
      label
    }}</UILabel>
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UIInput
        :type="type"
        v-model="value"
        @blur="handleBlur"
        :id="inputId"
        :name="name"
        v-bind="$attrs"
        :class="[hasIcon && 'pl-9']"
        :placeholder="placeholder"
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
    icon?: string;
    hint?: string;
    modelValue?: string;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    type?: string;
    placeholder?: string;
  }>();

  defineOptions({ inheritAttrs: false });

  const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value, handleBlur } = useField(
    () => props.name || inputId.value,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true,
    }
  );
</script>
