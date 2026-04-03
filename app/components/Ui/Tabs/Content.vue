<template>
  <TabsContent
    data-slot="tabs-content"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </TabsContent>
</template>

<script lang="ts" setup>
  import { TabsContent } from "reka-ui";
  import type { TabsContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    TabsContentProps & {
      /** Custom class(es) to add to parent element */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex-1 outline-none",
  });
</script>
