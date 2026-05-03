<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ description }}</slot>
  </AlertDialogDescription>
</template>

<script lang="ts" setup>
  import { AlertDialogDescription } from "reka-ui";
  import type { AlertDialogDescriptionProps } from "reka-ui";
  import { normalizeClass } from "vue";

  const props = defineProps<
    AlertDialogDescriptionProps & {
      /** Text to display in the description. */
      description?: string;
      /** Custom class(es) to add to the description. */
      class?: any;
    }
  >();

  const forwarded = reactiveOmit(props, "class", "description");

  const styles = tv({
    base: "text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
  });
</script>
