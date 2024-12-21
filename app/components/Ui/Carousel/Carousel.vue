<template>
  <div
    :class="styles({ class: props.class })"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot
      :can-scroll-next
      :can-scroll-prev
      :carousel-api
      :carousel-ref
      :orientation
      :scroll-next
      :scroll-prev
    />
  </div>
</template>

<script setup lang="ts">
  import type { CarouselEmits, CarouselProps, WithClassAsProps } from "~/composables/useCarousel";

  const styles = tv({
    base: "relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border",
  });
  const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
    orientation: "horizontal",
  });
  const emits = defineEmits<CarouselEmits>();

  const {
    canScrollNext,
    canScrollPrev,
    carouselApi,
    carouselRef,
    orientation,
    scrollNext,
    scrollPrev,
  } = useProvideCarousel(props, emits);

  defineExpose({
    canScrollNext,
    canScrollPrev,
    carouselApi,
    carouselRef,
    orientation: props.orientation,
    scrollNext,
    scrollPrev,
  });

  function onKeyDown(event: KeyboardEvent) {
    const prevKey = props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";

    if (event.key === prevKey) {
      event.preventDefault();
      scrollPrev();
      return;
    }

    if (event.key === nextKey) {
      event.preventDefault();
      scrollNext();
    }
  }
</script>
