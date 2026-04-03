<template>
  <Primitive
    data-slot="card-title"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    :as="as"
    :as-child="asChild"
  >
    <slot>
      {{ title }}
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
        /** Title to display in the card */
        title?: string;
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "h3",
    }
  );

  const styles = tv({
    base: "leading-none font-semibold",
  });
</script>
