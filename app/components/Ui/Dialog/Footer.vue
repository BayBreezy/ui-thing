<template>
  <Primitive
    data-slot="dialog-footer"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
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
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "div",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
  });
</script>
