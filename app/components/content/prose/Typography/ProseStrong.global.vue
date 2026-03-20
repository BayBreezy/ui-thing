<template>
  <strong
    data-slot="prose-strong"
    :class="proseStrongStyles({ class: normalizeClass(_class) || undefined })"
  >
    <slot />
  </strong>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
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
