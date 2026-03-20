<template>
  <hr data-slot="prose-hr" :class="proseHrStyles({ class: normalizeClass(_class) || undefined })" />
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseHrProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseHrStyles = tv({
    base: "mb-6 not-first:mt-6",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseHrProps>();
</script>
