<template>
  <SplitterGroup
    v-slot="{ layout }: { layout: number[] }"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :layout="layout" />
  </SplitterGroup>
</template>

<script lang="ts" setup>
  import { SplitterGroup, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { SplitterGroupEmits, SplitterGroupProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      SplitterGroupProps & {
        direction?: "horizontal" | "vertical";
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
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
