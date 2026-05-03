<template>
  <ScrollAreaRoot
    ref="scrollArea"
    data-slot="scroll-area"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <UiScrollAreaViewport>
      <slot />
    </UiScrollAreaViewport>
    <UiScrollAreaScrollbar :orientation="orientation" />
    <UiScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script lang="ts" setup>
  import { ScrollAreaRoot } from "reka-ui";
  import type { ScrollAreaRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaRootProps & {
        /** Orientation for scrolling. */
        orientation?: "vertical" | "horizontal";
        /** Custom class(es) to add to the parent. */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      orientation: "vertical",
    }
  );

  const scrollAreaRef = useTemplateRef<InstanceType<typeof ScrollAreaRoot>>("scrollArea");

  /** The viewport element of the scroll area. */
  const viewport = computed(() => scrollAreaRef.value?.viewport);
  /** The maximum scrollTop value (content height minus visible height). */
  const top = computed(() => {
    const vp = viewport.value;
    if (!vp) return 0;
    return vp.scrollHeight - vp.clientHeight;
  });
  /** Scrolls the viewport to the specified position. */
  const scrollTo = (options: ScrollToOptions) => {
    if (!viewport.value) return;
    viewport.value.scrollTo(options);
  };
  /** Scrolls the viewport to the bottom. */
  function scrollToBottom() {
    const vp = viewport.value;
    if (vp) {
      vp.scrollTo({ top: vp.scrollHeight - vp.clientHeight, behavior: "smooth" });
    }
  }

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({ base: "relative" });

  defineExpose({
    /** Scrolls the viewport to the specified position. */
    scrollTo,
    /** The maximum scrollTop value (content height minus visible height). */
    top,
    /** The viewport element of the scroll area. */
    viewport,
    /** Scrolls the viewport to the top. */
    scrollTop: () => scrollAreaRef.value?.scrollTop(),
    /** Scrolls the viewport to the top-left corner. */
    scrollTopLeft: () => scrollAreaRef.value?.scrollTopLeft(),
    /** Scrolls the viewport to the bottom. */
    scrollToBottom,
  });

  defineSlots<{
    /** The content of the scroll area. */
    default: (_?: any) => any;
  }>();
</script>
