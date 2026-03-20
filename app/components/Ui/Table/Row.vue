<template>
  <tr data-slot="table-row" :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot />
  </tr>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({
    base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  });
</script>
