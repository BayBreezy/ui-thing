<template>
  <div class="relative flex">
    <select
      :id="id"
      ref="select"
      v-model="localModel"
      data-slot="native-select"
      :multiple="multiple"
      :name="name"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      v-bind="$attrs"
      :class="styles({ class: normalizeClass(props.class) || undefined })"
    >
      <slot />
    </select>
    <span
      v-if="!multiple"
      class="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50 peer-aria-invalid:text-destructive/80"
    >
      <slot name="trailingIcon">
        <Icon :name="trailingIcon || 'lucide:chevron-down'" class="size-4" aria-hidden="true" />
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup generic="T extends any">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
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
    base: "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-md border border-input bg-transparent text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
    variants: {
      multiple: {
        true: "py-1 *:px-3 *:py-1 [&_option:checked]:bg-accent",
        false: "h-9 ps-3 pe-8",
      },
    },
  });

  defineOptions({ inheritAttrs: false });
  const select = ref<HTMLSelectElement | null>(null);
  defineEmits<{ "update:modelValue": [value: T] }>();
  const localModel = defineModel<T>();

  onMounted(() => {
    if (props.autofocus) {
      select.value?.focus();
    }
  });
</script>
