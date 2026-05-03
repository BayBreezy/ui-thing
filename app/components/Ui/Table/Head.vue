<template>
  <th data-slot="table-head" :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot />
  </th>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const styles = tv({
    base: "text-muted-foreground h-12 px-3 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
  });
</script>
