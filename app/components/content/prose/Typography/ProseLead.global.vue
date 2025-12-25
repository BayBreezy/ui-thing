<template>
  <p data-slot="prose-lead" :class="proseLeadStyles({ class: _class })">
    <slot />
  </p>
</template>

<script lang="ts">
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
