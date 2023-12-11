<template>
  <SelectSeparator :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')" />
</template>

<script lang="ts" setup>
  import { SelectSeparator } from "radix-vue";
  import type { SelectSeparatorProps } from "radix-vue";

  const props = defineProps<
    SelectSeparatorProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-muted",
  });
</script>
