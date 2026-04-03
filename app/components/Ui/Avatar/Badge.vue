<template>
  <Primitive
    data-slot="avatar-badge"
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

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      as: "span",
    }
  );

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: [
      "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full text-primary-foreground bg-blend-color ring-2 ring-background select-none group-data-[size=default]/avatar:size-2.5 group-data-[size=lg]/avatar:size-3 group-data-[size=sm]/avatar:size-2 group-data-[size=default]/avatar:[&>svg]:size-2 group-data-[size=lg]/avatar:[&>svg]:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
    ],
  });
</script>
