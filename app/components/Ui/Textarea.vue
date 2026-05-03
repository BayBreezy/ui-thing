<template>
  <textarea
    v-bind="props"
    ref="textarea"
    data-slot="textarea"
    :value="modelValue"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    @input="handleInput"
  />
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes, TextareaHTMLAttributes } from "vue";

  export type TextareaProps = {
    /** Additional classes to add to the textarea. */
    class?: HTMLAttributes["class"];
    /** The name of the textarea. */
    name?: TextareaHTMLAttributes["name"];
    /** The id of the textarea. */
    id?: TextareaHTMLAttributes["id"];
    /** The placeholder of the textarea. */
    placeholder?: TextareaHTMLAttributes["placeholder"];
    /** Whether the textarea is required. */
    required?: boolean;
    /** Whether the textarea is disabled. */
    disabled?: boolean;
    /** The number of rows to display. */
    rows?: number;
    /** The value of the textarea. */
    modelValue?: string;
    /** The maximum number of characters allowed. */
    maxlength?: number;
    /** The `RegExp` pattern of the textarea. */
    pattern?: string;
    /** Whether the textarea should be focused when mounted. */
    autofocus?: boolean;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TextareaProps>(), {
    modelValue: "",
  });

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();

  const textarea = useTemplateRef("textarea");

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
    base: "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  });

  onMounted(() => {
    if (props.autofocus) textarea.value?.focus();
  });
</script>
