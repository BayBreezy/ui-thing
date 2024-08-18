<template>
  <SelectItemIndicator v-bind="forwarded" class="flex items-center justify-center">
    <slot>
      <Icon :class="styles({ class: props.class })" :name="icon || 'lucide:check'" />
    </slot>
  </SelectItemIndicator>
</template>

<script lang="ts" setup>
  import { SelectItemIndicator } from "radix-vue";
  import type { SelectItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    SelectItemIndicatorProps & {
      /** Icon to render */
      icon?: string;
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "h-4 w-4",
  });
</script>
