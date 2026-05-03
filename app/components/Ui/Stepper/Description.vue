<template>
  <StepperDescription
    v-slot="slotProps"
    data-slot="stepper-description"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>

<script lang="ts" setup>
  import { StepperDescription, useForwardProps } from "reka-ui";
  import type { StepperDescriptionProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    StepperDescriptionProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({ base: "text-muted-foreground text-sm" });
</script>
