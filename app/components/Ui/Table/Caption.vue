<template>
  <caption
    data-slot="table-caption"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </caption>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({
    base: "text-muted-foreground mt-4 text-sm",
  });
</script>
