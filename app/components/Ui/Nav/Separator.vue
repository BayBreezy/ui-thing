<template>
  <UiSeparator
    orientation="vertical"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    /** Custom class(es) to add to the element */
    class?: HTMLAttributes["class"];
  }>();
  const forwarded = reactiveOmit(props, "class");

  const styles = tv({ base: "h-5" });
</script>
