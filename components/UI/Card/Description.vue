<template>
  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">
    <slot>
      {{ description }}
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        description?: string;
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );
  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
