<template>
  <ProgressRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <UIProgressIndicator :style="{ transform: `translateX(-${100 - (modelValue || 0)}%)` }" />
    </slot>
  </ProgressRoot>
</template>

<script lang="ts" setup>
  import { ProgressRoot, useForwardPropsEmits } from "radix-vue";
  import type { ProgressRootEmits, ProgressRootProps } from "radix-vue";

  const props = defineProps<
    ProgressRootProps & {
      class?: any;
    }
  >();

  const emits = defineEmits<ProgressRootEmits>();
  const forwarded = useForwardPropsEmits(props, emits);

  const styles = tv({
    base: "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
  });
</script>
