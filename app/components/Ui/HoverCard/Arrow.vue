<template>
  <HoverCardArrow
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { HoverCardArrow } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HoverCardArrowProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      HoverCardArrowProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      height: 5,
      width: 10,
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "fill-popover",
  });
</script>
