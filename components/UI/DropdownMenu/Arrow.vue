<template>
  <DropdownMenuArrow v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { DropdownMenuArrow, useForwardProps } from "radix-vue";
  import type { DropdownMenuArrowProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      DropdownMenuArrowProps & {
        class?: any;
      }
    >(),
    {
      asChild: false,
      width: 10,
      height: 5,
    }
  );
  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "rotate-45 border bg-muted",
  });
</script>
