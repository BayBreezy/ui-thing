<template>
  <div class="w-full">
    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && 'text-destructive', 'mb-2']">
      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>
    </UiLabel>
    <div class="relative">
      <slot name="icon">
        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />
        </span>
      </slot>
      <UiInput
        :id="inputId"
        type="file"
        :required="required"
        :name="name"
        v-bind="$attrs"
        :multiple="multiple"
        :class="[hasIcon && 'pl-9']"
        :accept="accept"
        @change="
          handleChange($event);
          emits('change', $event.target.files);
        "
        @blur="
          handleBlur($event);
          emits('blur', $event);
        "
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
  const props = defineProps<{
    label?: string;
    icon?: string;
    hint?: string;
    name: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    multiple?: boolean;
    accept?: string;
    required?: boolean;
  }>();

  const emits = defineEmits<{
    change: [files?: FileList | File | File[] | null];
    blur: [event?: FocusEvent];
  }>();

  const inputId = props.id || useId();

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, handleChange, handleBlur } = useField(() => props.name, props.rules, {
    label: props.label,
    validateOnMount: props.validateOnMount,
  });
</script>
