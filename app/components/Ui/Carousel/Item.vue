<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="styles({ orientation, class: `${props.class} ${grabbingClass}` })"
    @mousedown="isGrabbing = true"
    @mouseup="isGrabbing = false"
    @mouseleave="isGrabbing = false"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { WithClassAsProps } from "~/composables/useCarousel";

  const props = defineProps<
    WithClassAsProps & {
      /**
       * Whether to show the grab cursor when hovering over the item.
       * @default false
       */
      grabCursor?: boolean;
    }
  >();

  const { orientation } = useCarousel();

  const styles = tv({
    base: "min-w-0 shrink-0 grow-0 basis-full",
    variants: {
      orientation: {
        horizontal: "pl-4",
        vertical: "pt-4",
      },
    },
  });

  const isGrabbing = ref(false);

  const grabbingClass = computed(() => {
    if (!props.grabCursor) return "";
    return isGrabbing.value ? "cursor-grabbing" : "cursor-grab";
  });
</script>
