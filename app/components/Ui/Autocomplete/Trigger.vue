<template>
  <ComboboxTrigger v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </ComboboxTrigger>
</template>

<script lang="ts" setup>
  import { ComboboxTrigger } from "radix-vue";
  import type { ComboboxTriggerProps } from "radix-vue";

  const props = defineProps<
    ComboboxTriggerProps & {
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center",
  });
</script>
