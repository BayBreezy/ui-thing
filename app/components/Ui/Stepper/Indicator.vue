<template>
  <StepperIndicator
    v-slot="{ step }"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :step>
      <span
        class="transition-all group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0"
      >
        {{ step }}
      </span>
      <Icon
        name="lucide:check"
        class="absolute size-4 scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
        aria-hidden="true"
      />
      <span
        v-if="isLoading"
        class="absolute opacity-0 transition-all group-data-[state=active]/step:opacity-100 group-data-[state=active]/step:transition-none"
      >
        <Icon name="lucide:loader-circle" class="size-3.5 animate-spin" aria-hidden="true" />
      </span>
    </slot>
  </StepperIndicator>
</template>

<script lang="ts" setup>
  import { StepperIndicator, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { StepperIndicatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    StepperIndicatorProps & {
      class?: HTMLAttributes["class"];
      isLoading?: boolean;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class", "isLoading"));

  const styles = tv({
    base: "relative flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground group-data-[state=active]/step:bg-primary group-data-[state=active]/step:text-primary-foreground group-data-[state=completed]/step:bg-primary group-data-[state=completed]/step:text-primary-foreground",
  });
</script>
