<template>
  <ComboboxRoot v-bind="forwarded" :open="true" :class="styles({ class: props.class })">
    <slot />
  </ComboboxRoot>
</template>

<script lang="ts" setup>
  import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";
  import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";

  const props = defineProps<ComboboxRootProps & { class?: any }>();
  const emits = defineEmits<ComboboxRootEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
  });
</script>
