<template>
  <tfoot
    data-slot="table-footer"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </tfoot>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({
    base: "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
  });
</script>
