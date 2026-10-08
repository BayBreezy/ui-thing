<template>
  <ComboboxViewport
    data-slot="combobox-viewport"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ComboboxViewport>
</template>

<script lang="ts" setup>
  import { ComboboxViewport } from "reka-ui";
  import type { ComboboxViewportProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ComboboxViewportProps & {
      /** Custom class(es) to add to the viewport. */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  // Reka hides the scrollbar of the viewport with an injected stylesheet and sets `overflow: auto`
  // inline. The viewport is the element that scrolls, so the scrollbar is brought back here and
  // scrolling is limited to the y axis (important modifiers are needed to win over Reka's rules).
  const styles = tv({
    base: "[scrollbar-width:thin]! [scrollbar-color:var(--border)_transparent]! overflow-x-hidden! [&::-webkit-scrollbar]:block!",
  });
</script>
