<template>
  <strong data-slot="prose-strong" :class="proseStrongStyles({ class: _class })">
    <slot />
  </strong>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export type ProseStrongProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseStrongStyles = tv({
    base: "font-semibold text-inherit",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseStrongProps>();
</script>
