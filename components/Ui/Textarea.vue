<template>
  <textarea v-bind="props" v-model="localModel" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    name?: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    modelValue?: string;
  }>();

  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();

  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
