<template>
  <!-- Wrap only the ANCHORS (links/buttons) inside this component -->
  <div ref="root" data-slot="scrollspy" v-bind="$attrs" :class="props.class">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue";

  type TargetLike = HTMLElement | Window | Document | null | undefined;

  const props = withDefaults(
    defineProps<{
      /** Optional scroll container (pass a ref to a scrollable element). Defaults to window. */
      target?: MaybeRefOrGetter<TargetLike>;
      /** Default offset in px from the top when computing active section / scrolling. */
      offset?: number;
      /** Smooth scrolling on anchor click. */
      smooth?: boolean;
      /** Base data-* attribute, e.g. data-scrollspy-anchor. */
      dataAttribute?: string;
      /** Reflect active id in URL hash. */
      history?: boolean;
      /** Throttle time (ms) for scroll handler. */
      throttleTime?: number;
      /** Whether to mark only the current section or every visible section as active. */
      mode?: "single" | "multiple";
      /** Optional callback on change (also emits 'change'). */
      onUpdate?: (id: string) => void;
      /**
       * Additional classes to apply to the wrapper element.
       */
      class?: HTMLAttributes["class"];
    }>(),
    {
      offset: 0,
      smooth: true,
      dataAttribute: "scrollspy",
      history: true,
      throttleTime: 50,
      mode: "single",
    }
  );

  const emit = defineEmits<{ (e: "change", id: string): void }>();

  const { root } = useScrollspy({
    target: props.target,
    offset: props.offset,
    smooth: props.smooth,
    dataAttribute: props.dataAttribute,
    history: props.history,
    throttleTime: props.throttleTime,
    mode: props.mode,
    onChange: (id) => {
      props.onUpdate?.(id);
      emit("change", id);
    },
  });
</script>
