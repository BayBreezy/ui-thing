<template>
  <Primitive
    :data-completed="timelineData?.model?.value && step <= timelineData?.model?.value"
    :data-step="step"
    data-slot="timeline-item"
    aria-hidden="true"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { TimelineData } from "./Timeline.vue";
  import type { PrimitiveProps } from "radix-vue";

  import { timelineDataSymbol } from "./Timeline.vue";

  const timelineData = inject<TimelineData>(timelineDataSymbol);

  const styles = tv({
    base: "group/timeline-item relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=vertical]/timeline:ml-8 group-data-[orientation=horizontal]/timeline:[&:not(:last-child)]:pe-8 group-data-[orientation=vertical]/timeline:[&:not(:last-child)]:pb-12 [&_[data-slot=timeline-separator]]:has-[+[data-completed=true]]:bg-primary",
  });
  const props = defineProps<
    PrimitiveProps & {
      class?: any;
      step: number;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, ["class", "step"]));
</script>
