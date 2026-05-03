<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ title }}</slot>
  </AlertDialogTitle>
</template>

<script lang="ts" setup>
  import { AlertDialogTitle } from "reka-ui";
  import type { AlertDialogTitleProps } from "reka-ui";
  import { normalizeClass } from "vue";

  const props = defineProps<
    AlertDialogTitleProps & {
      /** Text to display in the title. */
      title?: string;
      /** Custom class(es) to add to the title. */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
  });
</script>
