<template>
  <StepperItem
    v-slot="slotProps"
    data-slot="stepper-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </StepperItem>
</template>

<script lang="ts" setup>
  import { StepperItem, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { StepperItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    StepperItemProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class"));
  const styles = tv({
    base: "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
  });
</script>
