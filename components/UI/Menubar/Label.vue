<template>
  <MenubarLabel :class="styles({ inset, class: props.class })" v-bind="props">
    <slot></slot>
  </MenubarLabel>
</template>

<script lang="ts" setup>
  import { MenubarLabel } from "radix-vue";
  import type { MenubarLabelProps } from "radix-vue";

  const props = defineProps<
    MenubarLabelProps & {
      class?: any;
      inset?: boolean;
    }
  >();

  const styles = tv({
    base: "px-2 py-1.5 text-sm font-semibold",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
