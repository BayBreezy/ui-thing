<template>
  <ProgressRoot v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
    <slot>
      <UiProgressIndicator
        :style="{ transform: `translateX(-${100 - ((modelValue || 0) / max) * 100}%)` }"
      />
    </slot>
  </ProgressRoot>
</template>

<script lang="ts" setup>
  import { ProgressRoot, useForwardPropsEmits } from "radix-vue";
  import type { ProgressRootEmits, ProgressRootProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      ProgressRootProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      max: 100,
      modelValue: 0,
    }
  );

  const emits = defineEmits<ProgressRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
  });
</script>
