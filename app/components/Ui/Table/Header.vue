<template>
  <thead
    data-slot="table-header"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </thead>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({
    base: "[&_tr]:border-b",
  });
</script>
