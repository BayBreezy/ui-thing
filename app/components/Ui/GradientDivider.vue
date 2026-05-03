<template>
  <Separator
    v-bind="forwarded"
    :class="
      styles({ orientation: props.orientation, class: normalizeClass(props.class) || undefined })
    "
  />
</template>

<script lang="ts" setup>
  import { Separator } from "reka-ui";
  import type { SeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SeparatorProps & {
      /** Custom class(es) to add to parent element. */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    base: "",
    variants: {
      orientation: {
        horizontal:
          "h-px w-full border-t-0 bg-[linear-gradient(90deg,--alpha(var(--input)/10%),var(--input),--alpha(var(--input)/10%))]",
        vertical:
          "h-full min-h-4 w-px border-l-0 bg-[linear-gradient(180deg,--alpha(var(--input)/10%),var(--input),--alpha(var(--input)/10%))]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  });
</script>
