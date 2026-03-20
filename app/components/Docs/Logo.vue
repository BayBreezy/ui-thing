<template>
  <svg
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    viewBox="0 0 475 594"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25 25L25 484" stroke="currentColor" stroke-width="50" stroke-linecap="round" />
    <path d="M450 25L450 484" stroke="currentColor" stroke-width="50" stroke-linecap="round" />
    <line
      x1="146"
      y1="569"
      x2="330"
      y2="569"
      stroke="currentColor"
      stroke-width="50"
      stroke-linecap="round"
    />
  </svg>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
  const styles = tv({
    base: "h-5 w-5",
  });
</script>
