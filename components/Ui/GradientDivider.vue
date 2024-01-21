<template>
  <Separator v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { Separator } from "radix-vue";
  import type { SeparatorProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      SeparatorProps & {
        /** Custom class(es) to add to parent element */
        class?: any;
      }
    >(),
    {
      as: "hr",
    }
  );

  const styles = tv({
    base: 'h-px w-full border-t-0 bg-[linear-gradient(90deg,theme("colors.input/10%"),_theme("colors.input"),_theme("colors.input/10%"))]',
  });
</script>
