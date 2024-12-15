<template>
  <SplitterGroup
    v-slot="{ layout }: { layout: number[] }"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot :layout="layout" />
  </SplitterGroup>
</template>

<script lang="ts" setup>
  import { SplitterGroup, useForwardPropsEmits } from "radix-vue";
  import type { SplitterGroupEmits, SplitterGroupProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      SplitterGroupProps & {
        direction?: "horizontal" | "vertical";
        class?: any;
      }
    >(),
    {
      direction: "horizontal",
      as: "div",
      keyboardResizeBy: 10,
    }
  );

  const emit = defineEmits<SplitterGroupEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);

  const styles = tv({
    base: "flex h-full w-full data-[orientation=vertical]:flex-col",
  });
</script>
