<template>
  <ListboxVirtualizer
    v-slot="{ option }"
    data-slot="listbox-virtualizer"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :option="option" />
  </ListboxVirtualizer>
</template>

<script lang="ts" setup>
  import { ListboxVirtualizer, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxVirtualizerProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<ListboxVirtualizerProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "",
  });
</script>
