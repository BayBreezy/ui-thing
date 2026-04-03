<template>
  <Primitive
    data-slot="card-footer"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    :as="as"
    :as-child="asChild"
  >
    <slot />
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
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
      }
    >(),
    { as: "div" }
  );

  const styles = tv({
    base: "flex items-center px-6 [.border-t]:pt-6",
  });
</script>
