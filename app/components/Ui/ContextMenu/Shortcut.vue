<template>
  <Primitive
    data-slot="context-menu-shortcut"
    :as="as || 'span'"
    :as-child="asChild"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PrimitiveProps & {
      /**
       * The custom class(es) to add to the element
       */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "ml-auto text-xs tracking-widest text-muted-foreground",
  });
</script>
