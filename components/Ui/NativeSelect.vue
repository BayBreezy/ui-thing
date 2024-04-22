<template>
  <div class="relative">
    <select
      :id="id"
      ref="select"
      v-model="localModel"
      :multiple="multiple"
      :name="name"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="styles({ class: props.class })"
    >
      <slot />
    </select>
    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center justify-center">
      <slot name="trailingIcon">
        <Icon
          :name="trailingIcon || 'lucide:chevrons-up-down'"
          class="h-4 w-4 text-muted-foreground"
        />
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    id?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    modelValue?: any;
    multiple?: boolean;
    size?: number;
    autofocus?: boolean;
    trailingIcon?: string;
  }>();
  const styles = tv({
    base: "h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 ring-offset-background focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });

  const select = ref<HTMLSelectElement | null>(null);
  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();

  const localModel = useVModel(props, "modelValue", emits);

  onMounted(() => {
    if (props.autofocus) {
      select.value?.focus();
    }
  });
</script>
