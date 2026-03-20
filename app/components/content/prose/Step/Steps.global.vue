<template>
  <div :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HtmlHTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      /** Additional CSS classes to apply to the steps container */
      class?: HtmlHTMLAttributes["class"];
    }>(),
    {}
  );

  const styles = tv({
    base: "relative ml-4 border-l pl-7 [counter-reset:step]",
  });
</script>
