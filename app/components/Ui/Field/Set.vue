<template>
  <Primitive
    :as
    :as-child
    data-slot="field-set"
    :class="fieldSetStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const fieldSetStyles = tv({
    base: [
      "flex flex-col gap-6",
      "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
    ],
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /**
         * Additional classes to apply to the fieldset element.
         */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "fieldset",
    }
  );
</script>
