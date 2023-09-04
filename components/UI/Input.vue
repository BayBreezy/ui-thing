<template>
  <input
    :class="styles({ class: props.class })"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    v-model="localModel"
  />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      id?: string;
      name?: string;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
      modelValue?: any;
    }>(),
    {}
  );
  const styles = tv({
    base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  });

  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();

  const localModel = useVModel(props, "modelValue", emits);
</script>
