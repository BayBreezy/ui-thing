<template>
  <HoverCardArrow :class="styles({ class: props.class })" v-bind="props" />
</template>

<script lang="ts" setup>
  import { HoverCardArrow } from "radix-vue";
  import type { HoverCardArrowProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      HoverCardArrowProps & {
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
