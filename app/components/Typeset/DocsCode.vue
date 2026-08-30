<template>
  <div class="bg-muted/60 relative rounded-lg">
    <pre :class="docsCodeStyles({ class: normalizeClass(props.class) || undefined })">{{
      code
    }}</pre>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const docsCodeStyles = tv({
    base: "no-scrollbar overflow-x-auto p-3 font-mono text-sm leading-relaxed",
  });

  export type TypesetDocsCodeProps = {
    code: string;
    /** Additional classes to apply to the code block. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TypesetDocsCodeProps>();
</script>
