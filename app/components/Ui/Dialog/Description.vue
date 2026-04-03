<template>
  <DialogDescription
    data-slot="dialog-description"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ description }}</slot>
  </DialogDescription>
</template>

<script lang="ts" setup>
  import { DialogDescription } from "reka-ui";
  import type { DialogDescriptionProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DialogDescriptionProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** The description text */
      description?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "description");
  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
