<template>
  <Primitive
    :as
    :as-child
    data-slot="field-legend"
    :data-variant="variant"
    :class="fieldLegendStyles({ class: normalizeClass(props.class) || undefined, variant })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  export const fieldLegendStyles = tv({
    base: ["mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm"],
    variants: {
      variant: {
        legend: "text-base",
        label: "text-sm",
      },
    },
    defaultVariants: {
      variant: "legend",
    },
  });

  export type FieldLegendProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the fieldset element.
     */
    class?: HTMLAttributes["class"];
    /**
     * The variant of the legend, either "legend" or "label".
     * @default "legend"
     */
    variant?: VariantProps<typeof fieldLegendStyles>["variant"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<FieldLegendProps>(), {
    as: "legend",
    variant: "legend",
  });
</script>
