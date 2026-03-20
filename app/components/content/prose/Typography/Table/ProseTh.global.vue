<template>
  <th data-slot="prose-th" :class="proseThStyles({ class: normalizeClass(_class) || undefined })">
    <slot />
  </th>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseThProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseThStyles = tv({
    base: "px-4 py-2 text-left font-bold text-pretty [[align=center]]:text-center [[align=right]]:text-right",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseThProps>();
</script>
