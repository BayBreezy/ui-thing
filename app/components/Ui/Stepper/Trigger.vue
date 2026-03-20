<template>
  <StepperTrigger
    v-bind="forwarded"
    data-slot="stepper-trigger"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </StepperTrigger>
</template>

<script lang="ts" setup>
  import { StepperTrigger, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { StepperTriggerProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes["class"] }>();

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  });
</script>
