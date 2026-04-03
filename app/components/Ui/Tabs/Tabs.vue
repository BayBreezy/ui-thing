<template>
  <TabsRoot
    data-slot="tabs"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </TabsRoot>
</template>

<script lang="ts" setup>
  import { TabsRoot, useForwardPropsEmits } from "reka-ui";
  import type { TabsRootEmits, TabsRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>(), {
    orientation: "horizontal",
    activationMode: "automatic",
  });
  const emits = defineEmits<TabsRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({ base: "flex flex-col gap-2" });
</script>
