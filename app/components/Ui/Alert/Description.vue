<template>
  <Primitive
    data-slot="alert-description"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ description }}</slot>
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
        /** Custom class to add to the parent. */
        class?: HTMLAttributes["class"];
        /** The description text that should be displayed. */
        description?: string;
      }
    >(),
    { as: "div" }
  );

  const forwarded = reactiveOmit(props, "class", "description");

  const styles = tv({
    base: "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
  });
</script>
