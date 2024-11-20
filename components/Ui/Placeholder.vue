<template>
  <Primitive :as :as-child :class="placeHolderStyles().wrapper({ class: props.class })">
    <svg :class="placeHolderStyles().svg()" fill="none">
      <defs>
        <pattern
          id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
        </pattern>
      </defs>
      <rect
        stroke="none"
        fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
        width="100%"
        height="100%"
      />
    </svg>

    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";
  import type { HTMLAttributes } from "vue";

  export const placeHolderStyles = tv({
    slots: {
      wrapper:
        "relative flex items-center justify-center overflow-hidden rounded-md border border-dashed px-4 opacity-75",
      svg: "absolute inset-0 size-full stroke-foreground/10",
    },
  });
</script>

<script lang="ts" setup>
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to add to the parent element.
       */
      class?: HTMLAttributes["class"];
    }
  >();
</script>
