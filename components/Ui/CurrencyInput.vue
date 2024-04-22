<template>
  <input ref="inputRef" type="text" :class="styles({ class: props.class })" v-bind="props" >
</template>

<script lang="ts" setup>
  import { defu } from "defu";
  import { useCurrencyInput } from "vue-currency-input";
  import type { CurrencyInputOptions } from "vue-currency-input";

  const props = defineProps<{
    class?: any;
    id?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    modelValue?: any;
    options?: CurrencyInputOptions;
  }>();

  const { inputRef } = useCurrencyInput(
    defu({}, props.options, {
      currency: "USD",
      locale: "en-US",
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
    })
  );

  const styles = tv({
    base: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
