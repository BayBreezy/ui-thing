<template>
  <Primitive
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ subtitle }}</slot>
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
        /** The subtitle of the component */
        subtitle?: string;
      }
    >(),
    {
      as: "p",
    }
  );
  const forwarded = reactiveOmit(props, "class", "subtitle");
  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
