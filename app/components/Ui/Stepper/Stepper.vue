<template>
  <StepperRoot
    v-slot="slotProps"
    data-slot="stepper"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>

<script lang="ts" setup>
  import { StepperRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { StepperRootEmits, StepperRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    StepperRootProps & {
      class?: HTMLAttributes["class"];
    }
  >();
  const emit = defineEmits<StepperRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);

  const styles = tv({
    base: "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
  });
</script>
