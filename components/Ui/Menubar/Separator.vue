<template>
  <MenubarSeparator :class="styles({ class: props.class })" v-bind="forwarded" />
</template>

<script lang="ts" setup>
  import { MenubarSeparator } from "radix-vue";
  import type { MenubarSeparatorProps } from "radix-vue";

  const props = defineProps<
    MenubarSeparatorProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
