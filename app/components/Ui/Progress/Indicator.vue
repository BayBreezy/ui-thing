<template>
  <ProgressIndicator
    data-slot="progress-indicator"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ProgressIndicator>
</template>

<script lang="ts" setup>
  import { ProgressIndicator } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ProgressIndicatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ProgressIndicatorProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "h-full w-full flex-1 rounded-full bg-primary transition-all",
  });
</script>
