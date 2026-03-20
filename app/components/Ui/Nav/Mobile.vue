<template>
  <Primitive
    data-slot="navbar-mobile"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PrimitiveProps & {
      /** Custom class(es) to add to the element */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    base: [
      "group/navbar-mobile flex items-center gap-x-3 px-4 py-2.5 md:hidden",
      "group-has-data-navbar-sticky/navbar:sticky group-has-data-navbar-sticky/navbar:top-0 group-has-data-navbar-sticky/navbar:border-b group-has-data-navbar-sticky/navbar:bg-background",
    ],
  });
</script>
