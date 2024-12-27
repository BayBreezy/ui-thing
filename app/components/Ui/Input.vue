<template>
  <input
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
      id?: string;
      name?: string;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
      type?: string;
      modelValue?: string;
      maxlength?: number;
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
