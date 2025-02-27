<template>
  <Primitive
    :data-orientation="orientation"
    data-slot="timeline"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";
  import type { ModelRef } from "vue";

  export type TimelineData = {
    model: ModelRef<number | undefined, string, number | undefined, number | undefined>;
    orientation: "horizontal" | "vertical";
  };
  export type TimelineProps = PrimitiveProps & {
    class?: any;
    orientation?: "horizontal" | "vertical";
    modelValue?: number | undefined;
  };
  export const timelineDataSymbol = Symbol("timeline-data");
</script>

<script lang="ts" setup>
  const styles = tv({
    base: "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
  });
  const model = defineModel<number | undefined>({ default: 1 });
  const props = withDefaults(defineProps<TimelineProps>(), {
    orientation: "vertical",
  });
  const forwarded = useForwardProps(reactiveOmit(props, ["modelValue", "class", "orientation"]));
  provide<TimelineData>(timelineDataSymbol, {
    model,
    orientation: props.orientation,
  });
</script>
