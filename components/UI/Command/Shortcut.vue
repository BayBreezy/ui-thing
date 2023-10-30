<template>
  <Primitive :as="as || 'span'" :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ shortcut }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

  const props = defineProps<
    PrimitiveProps & {
      class?: any;
      shortcut?: any;
    }
  >();
  const styles = tv({
    base: "ml-auto text-xs tracking-widest text-muted-foreground",
  });
</script>
