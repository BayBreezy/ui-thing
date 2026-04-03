<template>
  <Primitive
    data-slot="card-header"
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
    base: "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
  });
</script>
