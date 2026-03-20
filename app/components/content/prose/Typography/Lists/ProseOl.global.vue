<template>
  <ol data-slot="prose-ol" :class="proseOlStyles({ class: normalizeClass(_class) || undefined })">
    <slot mdc-unwrap="p" />
  </ol>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseOlProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseOlStyles = tv({
    base: "ml-4 list-decimal not-first:mt-6 not-last:mb-6 [&>li:not(:first-child)]:mt-2",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseOlProps>();
</script>
