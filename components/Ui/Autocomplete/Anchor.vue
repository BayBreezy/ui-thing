<template>
  <ComboboxAnchor v-bind="props" :class="styles({ class: props.class })">
    <slot />
  </ComboboxAnchor>
</template>

<script lang="ts" setup>
  import { ComboboxAnchor } from "radix-vue";
  import type { ComboboxAnchorProps } from "radix-vue";

  const props = defineProps<
    ComboboxAnchorProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  });
</script>
