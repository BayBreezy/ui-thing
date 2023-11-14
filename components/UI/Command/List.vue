<template>
  <ComboboxContent v-bind="forwarded" :class="styles({ class: props.class })">
    <slot></slot>
  </ComboboxContent>
</template>

<script lang="ts" setup>
  import { ComboboxContent, useForwardPropsEmits } from "radix-vue";
  import type { ComboboxContentEmits, ComboboxContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<
    ComboboxContentProps & {
      class?: any;
    }
  >();

  const emits = defineEmits<ComboboxContentEmits>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "max-h-[300px] overflow-y-auto overflow-x-hidden",
  });
</script>
