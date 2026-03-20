<!-- eslint-disable vue/html-self-closing -->
<template>
  <input
    :id
    ref="inputRef"
    type="text"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { defu } from "defu";
  import { normalizeClass } from "vue";
  import { useCurrencyInput } from "vue-currency-input";
  import type { HTMLAttributes } from "vue";
  import type { CurrencyInputOptions } from "vue-currency-input";

  const props = defineProps<{
    /**
     * Custom class(es) to add to the input element
     */
    class?: HTMLAttributes["class"];
    /**
     * The id of the input element
     */
    id?: string;
    /**
     * The name of the input element
     */
    name?: string;
    /**
     * The placeholder text for the input element
     */
    placeholder?: string;
    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
    /**
     * Whether the input is required
     */
    required?: boolean;
    modelValue?: any;
    /**
     * Options for the currency input
     *
     * @see https://dm4t2.github.io/vue-currency-input/config.html
     */
    options?: CurrencyInputOptions;
  }>();

  const { inputRef, formattedValue, numberValue, setOptions, setValue } = useCurrencyInput(
    defu({}, props.options, {
      currency: "USD",
      locale: "en-US",
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
    })
  );

  const forwarded = reactiveOmit(props, "class", "options", "id", "modelValue");
  const id = computed(() => props.id || `currency-input-${useId()}`);

  const styles = tv({
    base: "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
  });

  defineExpose({ inputRef, formattedValue, numberValue, setOptions, setValue });
</script>
