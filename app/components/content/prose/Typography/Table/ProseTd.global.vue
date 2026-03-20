<template>
  <td data-slot="prose-td" :class="proseTdStyles({ class: normalizeClass(_class) || undefined })">
    <slot />
  </td>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseTdProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseTdStyles = tv({
    base: "px-4 py-2 text-left text-pretty [[align=center]]:text-center [[align=right]]:text-right",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseTdProps>();
</script>
