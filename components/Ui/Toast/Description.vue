<template>
  <ToastDescription :class="styles({ class: props.class })" v-bind="forwarded">
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
  const forwarded = reactiveOmit(props, "class", "description");
  const styles = tv({
    base: "text-sm opacity-90",
  });
</script>
