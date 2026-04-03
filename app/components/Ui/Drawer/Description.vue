<template>
  <DrawerDescription
    data-slot="drawer-description"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      {{ props.text }}
    </slot>
  </DrawerDescription>
</template>

<script lang="ts" setup>
  import { DrawerDescription } from "vaul-vue";
  import type { DrawerDescriptionProps } from "vaul-vue";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  interface Props extends DrawerDescriptionProps {
    /**
     * Custom class(es) to add to the parent.
     */
    class?: HTMLAttributes["class"];
    /**
     * The text content of the description.
     */
    text?: string;
  }

  const props = defineProps<Props>();

  const styles = tv({ base: "text-sm text-muted-foreground" });
</script>
