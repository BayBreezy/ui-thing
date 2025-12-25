<template>
  <SelectViewport
    data-slot="select-viewport"
    :class="styles({ position, class: props.class })"
    v-bind="forwarded"
  >
    <slot />
  </SelectViewport>
</template>

<script lang="ts" setup>
  import { SelectViewport } from "reka-ui";
  import type { SelectViewportProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SelectViewportProps & {
      position?: "item-aligned" | "popper";
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "p-1",
    variants: {
      position: {
        popper:
          "h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width) scroll-my-1",
        "item-aligned": "",
      },
    },
  });
</script>
