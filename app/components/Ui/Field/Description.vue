<template>
  <Primitive
    :as
    :as-child
    data-slot="field-description"
    :class="fieldDescriptionStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const fieldDescriptionStyles = tv({
    base: [
      "text-muted-foreground text-sm leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance",
      "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
      "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
    ],
  });
</script>
<script lang="ts" setup>
  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Additional classes to apply to the element. */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "p",
    }
  );
</script>
