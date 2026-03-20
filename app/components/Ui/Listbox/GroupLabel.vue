<template>
  <ListboxGroupLabel
    data-slot="listbox-group-label"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ListboxGroupLabel>
</template>

<script lang="ts" setup>
  import { ListboxGroupLabel, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxGroupLabelProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<ListboxGroupLabelProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "py-1.5 pr-8 pl-1 text-sm font-semibold",
  });
</script>
