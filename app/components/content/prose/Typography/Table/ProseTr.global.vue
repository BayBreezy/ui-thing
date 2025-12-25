<template>
  <tr data-slot="prose-tr" :class="proseTrStyles({ class: _class })">
    <slot />
  </tr>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export type ProseTrProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseTrStyles = tv({
    base: "m-0 p-0 even:bg-muted/70 dark:even:bg-muted/50 [&:not(:has(th)):hover]:bg-muted dark:[&:not(:has(th)):hover]:bg-muted/50",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseTrProps>();
</script>
