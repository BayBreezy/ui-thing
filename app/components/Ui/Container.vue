<template>
  <Primitive
    data-slot="container"
    :data-constrained="constrained"
    :class="styles({ class: normalizeClass(props.class) || undefined, constrained })"
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

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
        /** Whether to constrain the width of the container */
        constrained?: boolean;
      }
    >(),
    {
      as: "div",
    }
  );

  const forwarded = reactiveOmit(props, "class", "constrained");

  const styles = tv({
    base: "mx-auto w-full max-w-7xl 2xl:max-w-(--breakpoint-2xl)",
    variants: {
      constrained: {
        true: "sm:px-6",
        false: "px-4 sm:px-6",
      },
    },
    defaultVariants: {
      constrained: false,
    },
  });
</script>
