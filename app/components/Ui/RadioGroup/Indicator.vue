<template>
  <RadioGroupIndicator
    data-slot="radio-group-indicator"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon
        :name="icon || 'lucide:circle'"
        mode="svg"
        class="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary fill-primary stroke-primary"
      />
    </slot>
  </RadioGroupIndicator>
</template>

<script lang="ts" setup>
  import { RadioGroupIndicator } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { RadioGroupIndicatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    RadioGroupIndicatorProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** Icon to show */
      icon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "relative flex items-center justify-center",
  });
</script>
