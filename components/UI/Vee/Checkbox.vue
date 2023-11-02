<template>
  <div :class="styles({ class: props.class })">
    <UICheckbox
      :id="inputId"
      v-bind="$attrs"
      :icon="icon"
      :value="value"
      :name="name"
      :required="required"
      :disabled="disabled"
      :checked="checked"
      @update:checked="handleChange"
    />
    <div class="flex flex-col gap-1.5">
      <slot name="label" :errorMessage="errorMessage" :checked="checked">
        <UILabel
          :for="inputId"
          v-if="label"
          class="leading-none"
          :class="[errorMessage && 'text-destructive']"
          >{{ label }}</UILabel
        >
      </slot>
      <TransitionSlide tag="div" group>
        <slot name="hint" :errorMessage="errorMessage" :checked="checked">
          <p
            key="hint"
            class="text-sm leading-none text-muted-foreground"
            v-if="hint && !errorMessage"
          >
            {{ hint }}
          </p>
        </slot>
        <slot name="errorMessage" :errorMessage="errorMessage" :checked="checked">
          <p key="errorMessage" class="text-sm leading-none text-destructive" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </slot>
      </TransitionSlide>
    </div>
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
    placeholder?: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
    class?: any;
  }>();
  const styles = tv({
    base: "flex gap-3",
  });

  defineOptions({ inheritAttrs: false });

  const inputId = useId(props.id);

  const { errorMessage, checked, handleChange } = useField(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      type: "checkbox",
      checkedValue: props.value || true,
      syncVModel: true,
    }
  );
</script>
