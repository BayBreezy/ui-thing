<template>
  <DialogTitle
    data-slot="dialog-title"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>{{ title }}</slot>
  </DialogTitle>
</template>

<script lang="ts" setup>
  import { DialogTitle } from "reka-ui";
  import type { DialogTitleProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DialogTitleProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** The title text */
      title?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "text-lg leading-none font-semibold tracking-tight",
  });
</script>
