<template>
  <Separator v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { Separator } from "reka-ui";
  import type { SeparatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SeparatorProps & {
      /** Custom class(es) to add to parent element */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    base: "h-px w-full border-t-0 bg-[linear-gradient(90deg,--alpha(var(--input)/10%),var(--input),--alpha(var(--input)/10%))]",
  });
</script>
