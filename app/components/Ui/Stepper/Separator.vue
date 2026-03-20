<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </StepperSeparator>
</template>

<script lang="ts" setup>
  import { StepperSeparator, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { StepperSeparatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    StepperSeparatorProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "m-0.5 bg-muted group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5 group-data-[state=completed]/step:bg-primary",
  });
</script>
