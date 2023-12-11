<template>
  <ComboboxInput v-bind="props" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ComboboxInput } from "radix-vue";
  import type { ComboboxInputProps } from "radix-vue";

  const props = defineProps<
    ComboboxInputProps & {
      type?: string;
      disabled?: boolean;
      autoFocus?: boolean;
      class?: any;
    }
  >();

  const styles = tv({
    base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
