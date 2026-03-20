<template>
  <ComboboxRoot
    v-slot="slotProps"
    data-slot="autocomplete"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>

<script lang="ts" setup>
  import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxRootProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const emits = defineEmits<ComboboxRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
  const styles = tv({ base: "relative" });
</script>
