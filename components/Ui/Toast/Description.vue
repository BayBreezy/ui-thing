<template>
  <ToastDescription
    :class="styles({ class: props.class })"
    v-bind="reactiveOmit(props, 'class', 'description')"
  >
    <slot>{{ description }}</slot>
  </ToastDescription>
</template>

<script lang="ts" setup>
  import { ToastDescription } from "radix-vue";
  import type { ToastDescriptionProps } from "radix-vue";

  const props = defineProps<
    ToastDescriptionProps & {
      /** The description text to render */
      description?: string;
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const styles = tv({
    base: "text-sm opacity-90",
  });
</script>
