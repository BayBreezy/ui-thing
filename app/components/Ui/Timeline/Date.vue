<template>
  <Primitive
    data-slot="timeline-date"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "mb-1 block text-xs font-medium text-muted-foreground group-data-[orientation=vertical]/timeline:max-sm:h-4",
  });
  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "time",
    }
  );

  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
