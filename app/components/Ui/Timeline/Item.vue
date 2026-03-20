<template>
  <Primitive
    :data-completed="
      step <= (timelineData?.model?.value ?? 0) ? timelineData?.model?.value : undefined
    "
    :data-step="step"
    data-slot="timeline-item"
    aria-hidden="true"
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
  import type { TimelineData } from "./Timeline.vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  import { timelineDataSymbol } from "./Timeline.vue";

  const timelineData = inject<TimelineData>(timelineDataSymbol);

  const styles = tv({
    base: "group/timeline-item relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-12 has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary",
  });
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional class(es) to add to the parent
       */
      class?: HTMLAttributes["class"];
      /**
       * Step number
       */
      step: number;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, ["class", "step"]));
</script>
