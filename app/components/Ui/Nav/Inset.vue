<template>
  <Primitive
    data-navbar-inset="true"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <div
      class="bg-background md:ring-foreground/15 md:dark:bg-background md:dark:ring-border grow p-6 md:rounded-lg md:p-12 md:shadow-xs md:ring-1"
    >
      <div class="mx-auto max-w-7xl">
        <slot />
      </div>
    </div>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PrimitiveProps & {
      /** Custom class(es) to add to the element. */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    base: ["bg-background flex flex-1 flex-col pb-2 md:px-2"],
  });
</script>
