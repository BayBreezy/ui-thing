<template>
  <ProgressRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <UiProgressIndicator :style="{ transform: `translateX(-${100 - (modelValue || 0)}%)` }" />
    </slot>
  </ProgressRoot>
</template>

<script lang="ts" setup>
  import { ProgressRoot, useForwardPropsEmits } from "radix-vue";
  import type { ProgressRootEmits, ProgressRootProps } from "radix-vue";

  const props = defineProps<
    ProgressRootProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const emits = defineEmits<ProgressRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
  });
</script>
