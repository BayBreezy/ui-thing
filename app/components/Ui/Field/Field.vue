<template>
  <Primitive
    :as
    :as-child
    role="group"
    data-slot="field"
    :data-orientation="orientation"
    :class="fieldStyles({ class: normalizeClass(props.class) || undefined, orientation })"
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

  export const fieldStyles = tv({
    base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
    variants: {
      orientation: {
        vertical: ["flex-col *:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "*:data-[slot=field-label]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto [&>.sr-only]:w-auto",
          "@md/field-group:*:data-[slot=field-label]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  });

  export type FieldProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the fieldset element.
     */
    class?: HTMLAttributes["class"];
    /**
     * The orientation of the field, either "vertical", "horizontal", or "responsive".
     * @default "vertical"
     */
    orientation?: VariantProps<typeof fieldStyles>["orientation"];
  };
</script>
<script lang="ts" setup>
  const props = withDefaults(defineProps<FieldProps>(), {
    orientation: "vertical",
  });
</script>
