<template>
  <CheckboxRoot
    :as-child="asChild"
    :default-checked="defaultChecked"
    :checked="checked"
    v-model="localModelValue"
    @checked-change="onCheckedChange"
    :disabled="disabled"
    :required="required"
    :name="name"
    :value="value"
    :id="checkboxId"
    @update:checked="emit('update:checked', $event)"
    v-bind="$attrs"
    :class="styles({ class: props.class })"
  >
    <slot>
      <UICheckboxIndicator :icon="icon" />
    </slot>
  </CheckboxRoot>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      asChild?: boolean;
      defaultChecked?: boolean;
      checked?: boolean;
      onCheckedChange?: void;
      modelValue?: any;
      disabled?: boolean;
      required?: boolean;
      name?: string;
      value?: string;
      id?: string;
      icon?: string;
    }>(),
    {
      value: "on",
    }
  );

  const checkboxId = computed(
    () => props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`
  );

  const styles = tv({
    base: "peer h-4 w-4 shrink-0 rounded-sm border border-primary aria-[checked=true]:bg-primary aria-[checked=true]:text-primary-foreground data-[disabled]:cursor-not-allowed data-[disabled]:border-primary/50 data-[disabled]:opacity-50 [&>input:disabled]:cursor-not-allowed [&>input]:cursor-pointer",
  });

  const emit = defineEmits<{
    "update:checked": [any];
    "update:modelValue": [any];
  }>();

  const localModelValue = useVModel(props, "modelValue", emit);
</script>
