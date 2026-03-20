<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <UiProgressIndicator
        :style="{ transform: `translateX(-${100 - ((modelValue || 0) / max) * 100}%)` }"
      />
    </slot>
  </ProgressRoot>
</template>

<script lang="ts" setup>
  import { ProgressRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ProgressRootEmits, ProgressRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      ProgressRootProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
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
    base: "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
  });
</script>
