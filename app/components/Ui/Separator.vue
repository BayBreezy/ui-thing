<template>
  <Separator
    data-slot="separator"
    v-bind="forwarded"
    :class="styles({ orientation, class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts">
  import { Separator, useForwardProps } from "reka-ui";
  import type { SeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type UiSeparatorProps = SeparatorProps & {
    /**
     * Custom class(es) to add to the separator
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<UiSeparatorProps>(), {
    orientation: "horizontal",
    decorative: true,
  });

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "shrink-0 bg-border",
    variants: {
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
    },
  });
</script>
