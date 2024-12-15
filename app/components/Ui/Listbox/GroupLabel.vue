<template>
  <ListboxGroupLabel v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </ListboxGroupLabel>
</template>

<script lang="ts" setup>
  import { ListboxGroupLabel, useForwardProps } from "radix-vue";
  import type { ListboxGroupLabelProps } from "radix-vue";

  const props = defineProps<ListboxGroupLabelProps & { class?: any }>();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "py-1.5 pl-1 pr-8 text-sm font-semibold",
  });
</script>
