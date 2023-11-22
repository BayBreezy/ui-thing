<template>
  <ComboboxLabel
    :class="styles({ class: props.class })"
    v-bind="reactiveOmit(props, 'class', 'label')"
  >
    <slot>{{ label }}</slot>
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  import { ComboboxLabel } from "radix-vue";
  import type { ComboboxLabelProps } from "radix-vue";

  const props = defineProps<
    ComboboxLabelProps & {
      /**
       * Class(es) to pass to the ComboboxLabel component.
       */
      class?: any;
      /**
       * The label to display.
       */
      label?: any;
    }
  >();

  const styles = tv({
    base: "px-2 py-1.5 text-xs font-medium text-muted-foreground",
  });
</script>
