<template>
  <Primitive :as="as || 'span'" :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ shortcut }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = defineProps<
    PrimitiveProps & {
      /**Custom class(es) to add to the element */
      class?: any;
      /** The shortcut text to render */
      shortcut?: any;
    }
  >();
  const styles = tv({
    base: "ml-auto text-xs tracking-widest text-muted-foreground",
  });
</script>
