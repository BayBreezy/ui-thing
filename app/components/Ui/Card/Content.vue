<template>
  <Primitive
    data-slot="card-content"
    :as="as"
    :as-child="asChild"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      {{ content }}
    </slot>
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
        /** Content to display in the card */
        content?: string;
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
      }
    >(),
    { as: "div" }
  );
  const styles = tv({
    base: "px-6",
  });
</script>
