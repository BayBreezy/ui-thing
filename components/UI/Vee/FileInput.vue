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
        type="file"
        @change="
          handleChange($event);
          emits('change', $event.target.files);
        "
        @blur="
          handleBlur($event);
          emits('blur', $event);
        "
        :id="inputId"
        :name="name"
        v-bind="$attrs"
        :multiple="multiple"
        :class="[hasIcon && 'pl-9']"
        :accept="accept"
      />
    </div>
    <TransitionSlide group tag="div">
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
    name: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    multiple?: boolean;
    accept?: string;
  }>();

  defineOptions({ inheritAttrs: false });

  const emits = defineEmits<{
    change: [files?: FileList | File | File[] | null];
    blur: [event?: FocusEvent];
  }>();

  const inputId = useId(props.id);

  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));

  const { errorMessage, handleChange, handleBlur } = useField(() => props.name, props.rules, {
    label: props.label,
    validateOnMount: props.validateOnMount,
  });
</script>
