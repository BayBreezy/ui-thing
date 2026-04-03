<template>
  <Primitive
    data-slot="skeleton"
    :class="styles({ loading, class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "animate-pulse rounded-md bg-muted",
    variants: {
      loading: { true: "cursor-wait", false: "cursor-default" },
    },
  });

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
        /** Whether the skeleton is loading */
        loading?: boolean;
      }
    >(),
    {
      as: "div",
    }
  );

  const forwarded = reactiveOmit(props, "class", "loading");
</script>
