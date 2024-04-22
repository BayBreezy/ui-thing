<template>
  <Primitive
    v-bind="reactiveOmit(props, 'description', 'class')"
    :class="styles({ class: props.class })"
  >
    <slot>{{ description }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class to add to the parent */
        class?: any;
        /** The description text that should be displayed */
        description?: string;
      }
    >(),
    { as: "div", class: undefined, description: undefined }
  );

  const styles = tv({
    base: "text-sm [&_p]:leading-relaxed",
  });
</script>
