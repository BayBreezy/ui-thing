<template>
  <div>
    <div ref="container" class="!cursor-none">
      <ClientOnly>
        <UiPlaceholder class="h-[400px]"> {{ x }}, {{ y }} </UiPlaceholder>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  const container = ref<HTMLElement>();
  const { x, y } = useMouseInElement(container, {
    resetOnTouchEnds: true,
    type: "client",
  });

  const { tippy } = useTippy(container, {
    content: computed(() => `(${x.value},${y.value})`),
    trigger: "mouseenter focus click",
    placement: "top",
    animation: false,
    hideOnClick: false,
    offset: [0, 30],
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-sky-600 inline" viewBox="0 0 24 24"><path fill="currentColor" d="M7.407 2.486c-.917-.612-2.251.046-2.152 1.238l.029.347a86 86 0 0 0 2.79 15.693c.337 1.224 2.03 1.33 2.544.195l2.129-4.697c.203-.449.697-.737 1.234-.68l5.266.564c1.209.13 2.063-1.346 1.094-2.281A91 91 0 0 0 7.703 2.684z"/></svg>`,
    getReferenceClientRect: function () {
      return {
        width: 0,
        height: 0,
        top: y.value,
        right: x.value,
        bottom: y.value,
        left: x.value,
      };
    },
  });

  // Sticky alternative
  watch([x, y], () => tippy.value?.popperInstance?.update());
</script>
