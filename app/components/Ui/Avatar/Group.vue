<template>
  <Primitive
    data-slot="avatar-group"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";

  const props = defineProps<
    PrimitiveProps & {
      /** Custom class(es) to add to the element */
      class?: any;
    }
  >();

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: [
      "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
    ],
  });
</script>
