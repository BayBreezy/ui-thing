<template>
  <ContextMenuArrow
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { ContextMenuArrow } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ContextMenuArrowProps } from "reka-ui";
  import type { HtmlHTMLAttributes } from "vue";

  const props = defineProps<
    ContextMenuArrowProps & {
      /** Custom class(es) to add to the arrow */
      class?: HtmlHTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "border bg-muted",
  });
</script>
