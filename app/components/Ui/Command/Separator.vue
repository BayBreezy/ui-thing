<template>
  <Separator
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    data-slot="command-separator"
    cmdk-separator
  >
    <slot />
  </Separator>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Separator } from "reka-ui";
  import type { SeparatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SeparatorProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "-mx-1 h-px bg-border",
  });
</script>
