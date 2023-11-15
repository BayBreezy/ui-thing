<template>
  <DropdownMenuSeparator :class="styles({ class: props.class })" v-bind="props" />
</template>

<script lang="ts" setup>
  import { DropdownMenuSeparator } from "radix-vue";
  import type { DropdownMenuSeparatorProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuSeparatorProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
