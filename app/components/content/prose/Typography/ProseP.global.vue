<template>
  <p data-slot="prose-p" :class="prosePStyles({ class: _class })">
    <slot />
  </p>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export type ProsePProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const prosePStyles = tv({
    base: "leading-7 text-pretty not-first:mt-6",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProsePProps>();
</script>
