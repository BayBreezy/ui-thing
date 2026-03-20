<template>
  <p
    data-slot="prose-lead"
    :class="proseLeadStyles({ class: normalizeClass(_class) || undefined })"
  >
    <slot />
  </p>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseLeadProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseLeadStyles = tv({
    base: "text-xl leading-7 text-pretty text-muted-foreground not-first:mt-6",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseLeadProps>();
</script>
