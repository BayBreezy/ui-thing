<template>
  <li data-slot="prose-li" :class="proseLiStyles({ class: normalizeClass(_class) || undefined })">
    <slot mdc-unwrap="p" />
  </li>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ProseListItemProps = {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseLiStyles = tv({
    base: "text-pretty [&>ol]:mt-2! [&>ul]:mt-2!",
  });
</script>

<script setup lang="ts">
  const { class: _class } = defineProps<ProseListItemProps>();
</script>
