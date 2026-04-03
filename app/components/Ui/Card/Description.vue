<template>
  <Primitive
    data-slot="card-description"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    :as="as"
    :as-child="asChild"
  >
    <slot>
      {{ description }}
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
        /** Description to display in the card */
        description?: string;
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "div",
    }
  );
  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
