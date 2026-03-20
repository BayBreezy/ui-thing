<template>
  <Primitive
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ title }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
        /** The title of the component */
        title?: string;
      }
    >(),
    {
      as: "p",
    }
  );
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "font-semibold",
  });
</script>
