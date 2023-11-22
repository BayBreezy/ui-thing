<template>
  <HoverCardArrow :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')" />
</template>

<script lang="ts" setup>
  import { HoverCardArrow } from "radix-vue";
  import type { HoverCardArrowProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      HoverCardArrowProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      height: 5,
      width: 10,
    }
  );

  const styles = tv({
    base: " fill-popover",
  });
</script>
