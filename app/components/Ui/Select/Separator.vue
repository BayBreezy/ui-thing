<template>
  <SelectSeparator
    data-slot="select-separator"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { SelectSeparator } from "reka-ui";
  import type { SelectSeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SelectSeparatorProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "bg-border pointer-events-none -mx-1 my-1 h-px",
  });
</script>
