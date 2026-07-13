<template>
  <Primitive
    data-slot="marker"
    :data-variant="variant"
    v-bind="forwarded"
    :class="markerStyles({ variant, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const markerStyles = tv({
    base: "group/marker text-muted-foreground [a]:hover:text-foreground relative flex min-h-4 w-full items-center gap-2 text-left text-sm [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3",
    variants: {
      variant: {
        default: "",
        separator:
          "before:bg-border after:bg-border before:mr-1 before:h-px before:min-w-0 before:flex-1 after:ml-1 after:h-px after:min-w-0 after:flex-1",
        border: "border-border border-b pb-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  export type MarkerVariants = VariantProps<typeof markerStyles>;

  export type MarkerProps = PrimitiveProps & {
    /**
     * The marker layout.
     *
     * @default "default"
     */
    variant?: MarkerVariants["variant"];
    /** Additional classes to apply to the root element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MarkerProps>(), {
    variant: "default",
  });

  const forwarded = reactiveOmit(props, ["variant", "class"]);
</script>
