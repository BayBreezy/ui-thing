<template>
  <div class="w-full">
    <UILabel :for="inputId" v-if="label" :class="[errorMessage && 'text-destructive', 'mb-2']">{{
      label
    }}</UILabel>
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" lass="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground" />
        </span>
      </slot>
      <UINativeSelect
        :trailingIcon="trailingIcon"
        v-model="value"
        @blur="handleBlur"
        :id="inputId"
        :name="name"
        v-bind="$attrs"
        :class="[hasIcon && 'pl-9']"
      >
        <slot></slot>
      </UINativeSelect>
    </div>
    <TransitionSlide group appear>
      <p key="hint" class="mt-1.5 text-[13px] text-muted-foreground" v-if="hint && !errorMessage">
        {{ hint }}
      </p>

      <p key="errorMessage" class="mt-1.5 text-[13px] text-destructive" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts" setup>
  import { useId } from "radix-vue";

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
    trailingIcon?: string;
  }>();

  defineOptions({ inheritAttrs: false });

  const inputId = useId(props.id);

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });
</script>
