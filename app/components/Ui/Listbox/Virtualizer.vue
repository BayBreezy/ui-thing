<template>
  <ListboxVirtualizer
    v-slot="{ option }"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot :option="option" />
  </ListboxVirtualizer>
</template>

<script lang="ts" setup>
  import { ListboxVirtualizer, useForwardProps } from "radix-vue";
  import type { ListboxVirtualizerProps } from "radix-vue";

  const props = defineProps<ListboxVirtualizerProps & { class?: any }>();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "",
  });
</script>
