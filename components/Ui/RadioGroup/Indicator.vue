<template>
  <RadioGroupIndicator
    v-bind="reactiveOmit(props, 'class', 'icon')"
    :class="styles({ class: props.class })"
  >
    <slot>
      <Icon :name="icon || 'ph:circle-fill'" class="h-2.5 w-2.5 fill-current text-current" />
    </slot>
  </RadioGroupIndicator>
</template>

<script lang="ts" setup>
  import { RadioGroupIndicator } from "radix-vue";
  import type { RadioGroupIndicatorProps } from "radix-vue";

  const props = defineProps<
    RadioGroupIndicatorProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** Icon to show */
      icon?: string;
    }
  >();

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
