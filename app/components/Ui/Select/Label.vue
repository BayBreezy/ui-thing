<template>
  <SelectLabel
    data-slot="select-label"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </SelectLabel>
</template>

<script lang="ts" setup>
  import { SelectLabel } from "reka-ui";
  import type { SelectLabelProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SelectLabelProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "text-muted-foreground px-2 py-1.5 text-xs",
  });
</script>
