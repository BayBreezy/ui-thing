<template>
  <AutocompleteRoot
    v-slot="slotProps"
    data-slot="autocomplete"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </AutocompleteRoot>
</template>

<script lang="ts" setup>
  import { AutocompleteRoot, useForwardPropsEmits } from "reka-ui";
  import type { AutocompleteRootEmits, AutocompleteRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    AutocompleteRootProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const emits = defineEmits<AutocompleteRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
  const styles = tv({ base: "relative" });
</script>
