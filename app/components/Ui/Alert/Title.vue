<template>
  <Primitive
    data-slot="alert-title"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ title }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class to add to the parent. */
        class?: HTMLAttributes["class"];
        /** The title text that should be displayed. */
        title?: string;
      }
    >(),
    { as: "h5" }
  );

  const forwarded = reactiveOmit(props, "class", "title");

  const styles = tv({
    base: "mb-1 line-clamp-1 min-h-4 leading-none font-medium tracking-tight",
  });
</script>
