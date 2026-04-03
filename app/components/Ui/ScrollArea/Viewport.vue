<template>
  <ScrollAreaViewport
    data-slot="scroll-area-viewport"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ScrollAreaViewport>
</template>

<script lang="ts" setup>
  import { ScrollAreaViewport } from "reka-ui";
  import type { ScrollAreaViewportProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ScrollAreaViewportProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
  });
</script>
