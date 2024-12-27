<template>
  <textarea
    v-bind="props"
    :value="modelValue"
    :class="styles({ class: props.class })"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** Additional classes to add to the textarea */
      class?: any;
      /** The name of the textarea */
      name?: string;
      /** The id of the textarea */
      id?: string;
      /** The placeholder of the textarea */
      placeholder?: string;
      /** Whether the textarea is required */
      required?: boolean;
      /** Whether the textarea is disabled */
      disabled?: boolean;
      /** The number of rows to display */
      rows?: number;
      /** The value of the textarea */
      modelValue?: string;
      /** The maximum number of characters allowed */
      maxlength?: number;
      /** The `RegExp` pattern of the textarea */
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
    base: "form-textarea flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm",
  });
</script>
