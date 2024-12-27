<template>
  <textarea
    v-bind="props"
    :value="modelValue"
    @input="handleInput"
    :class="styles({ class: props.class })"
  />
</template>

<script lang="ts" setup>
  import { computed } from "vue";

  const props = withDefaults(
    defineProps<{
      class?: any;
      name?: string;
      id?: string;
      placeholder?: string;
      required?: boolean;
      disabled?: boolean;
      rows?: number;
      modelValue?: string;
      maxlength?: number;
      pattern?: string;
    }>(),
    {
      modelValue: "",
    }
  );

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();

  const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    let value = target.value;

    /* Validate input with pattern */
    if (props.pattern) {
      const regex = new RegExp(props.pattern);
      value = Array.from(value)
        .filter((char) => regex.test(char))
        .join("");
    }

    /* Handle maxlength */
    if (props.maxlength) {
      value = value.slice(0, props.maxlength);
    }

    target.value = value;
    emit("update:modelValue", value);
  };

  const styles = tv({
    base: "form-textarea flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
