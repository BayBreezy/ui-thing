<template>
  <StepperTitle
    v-bind="forwarded"
    data-slot="stepper-title"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </StepperTitle>
</template>

<script lang="ts" setup>
  import { StepperTitle, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { StepperTitleProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    StepperTitleProps & {
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));
  const styles = tv({ base: "text-sm font-medium" });
</script>
