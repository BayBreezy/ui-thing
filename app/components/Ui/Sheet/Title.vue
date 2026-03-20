<template>
  <DialogTitle
    data-slot="sheet-title"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ title }}</slot>
  </DialogTitle>
</template>

<script lang="ts" setup>
  import { DialogTitle } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { DialogTitleProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DialogTitleProps & {
      /** Custom class(es) to add to parent element */
      class?: HTMLAttributes["class"];
      /** Title text */
      title?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "font-semibold text-foreground",
  });
</script>
