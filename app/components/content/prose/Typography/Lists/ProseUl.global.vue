<template>
  <ul data-slot="prose-ul" :class="proseUlStyles({ class: normalizeClass(_class) || undefined })">
    <slot mdc-unwrap="p" />
  </ul>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseUlProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseUlStyles = tv({
    base: "ml-4 list-disc not-first:mt-6 not-last:mb-6 [&>li:not(:first-child)]:mt-2",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseUlProps>();
</script>
