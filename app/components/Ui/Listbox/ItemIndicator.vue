<template>
  <ListboxItemIndicator v-bind="forwarded">
    <slot>
      <Icon :class="styles({ class: props.class })" :name="icon || 'lucide:circle-check'" />
    </slot>
  </ListboxItemIndicator>
</template>

<script lang="ts" setup>
  import { ListboxItemIndicator, useForwardPropsEmits } from "radix-vue";
  import type { ListboxItemIndicatorProps } from "radix-vue";

  const props = defineProps<ListboxItemIndicatorProps & { class?: any; icon?: string }>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"));

  const styles = tv({
    base: "size-5 shrink-0",
  });
</script>
