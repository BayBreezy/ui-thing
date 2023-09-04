<template>
  <SwitchRoot
    :default-checked="defaultChecked"
    :checked="checked"
    :disabled="disabled"
    :required="required"
    :name="name"
    :id="id"
    :value="value"
    :asChild="asChild"
    @update:checked="($event) => $emit('update:checked', $event)"
    :class="styles({ class: props.class })"
  >
    <UISwitchThumb>
      <slot></slot>
    </UISwitchThumb>
  </SwitchRoot>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      defaultChecked?: boolean;
      checked?: boolean;
      disabled?: boolean;
      required?: boolean;
      name?: string;
      id?: string;
      value?: string;
      asChild?: boolean;
      class?: any;
    }>(),
    {}
  );

  const styles = tv({
    base: "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  });
  const emits = defineEmits<{
    "update:checked": [payload: boolean];
  }>();
</script>
