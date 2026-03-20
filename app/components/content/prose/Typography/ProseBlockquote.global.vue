<template>
  <blockquote
    data-slot="prose-blockquote"
    :class="proseBlockquoteStyles({ class: normalizeClass(_class) || undefined })"
  >
    <slot />
  </blockquote>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseBlockquoteProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseBlockquoteStyles = tv({
    base: "border-l-2 pl-6 text-pretty italic not-first:mt-6",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseBlockquoteProps>();
</script>
