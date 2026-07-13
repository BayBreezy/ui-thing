<template>
  <Primitive
    data-slot="bubble-content"
    v-bind="forwarded"
    :class="bubbleContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const bubbleContentStyles = tv({
    base: "[button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-ring/50 w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:ring-3",
  });

  export type BubbleContentProps = PrimitiveProps & {
    /** Additional classes to apply to the content element. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BubbleContentProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
