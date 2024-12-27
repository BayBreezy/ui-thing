<template>
  <!-- eslint-disable-next-line vue/html-self-closing -->
  <input
    v-bind="props"
    :class="styles({ class: props.class })"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** Additional classes to add to the input */
      class?: any;
      /** The id of the input */
      id?: string;
      /** The name of the input */
      name?: string;
      /** The placeholder of the input */
      placeholder?: string;
      /** Whether the input is disabled */
      disabled?: boolean;
      /** Whether the input is required */
      required?: boolean;
      /** The type of the input */
      type?: string;
      /** The value of the input */
      modelValue?: any;
      /** The maximum length of the input */
      maxlength?: number;
      /** The `RegExp` pattern of the input */
      pattern?: string;
    }>(),
    {
      type: "text",
      modelValue: "",
    }
  );

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    /* val input with pattern */
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
    base: "form-input h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:px-1 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm",
  });
</script>
