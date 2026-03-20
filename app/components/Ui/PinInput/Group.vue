<template>
  <Primitive
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    data-slot="pin-input-group"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PrimitiveProps & {
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({ base: "flex items-center" });
</script>
