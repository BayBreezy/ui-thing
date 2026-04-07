<template>
  <Primitive
    :as="as || 'span'"
    :as-child="asChild"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ shortcut }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PrimitiveProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
      /** The shortcut text to render */
      shortcut?: any;
    }
  >();
  const styles = tv({
    base: "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
  });
</script>
