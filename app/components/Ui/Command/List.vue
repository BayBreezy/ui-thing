<template>
  <ListboxContent
    data-slot="command-list"
    v-bind="forwarded"
    cmdk-list
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { ListboxContent, useForwardProps } from "reka-ui";
  import type { ListboxContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ListboxContentProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
  });
</script>
