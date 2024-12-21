<template>
  <UiButton
    :disabled="!canScrollPrev"
    :class="styles().base({ orientation, class: props.class })"
    :variant
    @click="scrollPrev"
  >
    <slot>
      <Icon :name="props.icon" :class="styles().icon({ orientation, class: props.iconClass })" />
      <span class="sr-only">{{ props.srText }}</span>
    </slot>
  </UiButton>
</template>

<script setup lang="ts">
  import type { WithClassAsProps } from "~/composables/useCarousel";

  const props = withDefaults(
    defineProps<
      WithClassAsProps & {
        icon?: string;
        srText?: string;
        iconClass?: any;
        variant?: VariantProps<typeof buttonStyles>["variant"];
      }
    >(),
    {
      icon: "lucide:arrow-left",
      srText: "Previous Slide",
      variant: "outline",
    }
  );

  const { orientation, canScrollPrev, scrollPrev } = useCarousel();

  const styles = tv({
    slots: {
      base: "absolute h-8 w-8 touch-manipulation rounded-full p-0",
      icon: "size-4 text-current",
    },
    variants: {
      orientation: {
        horizontal: { base: "-left-12 top-1/2 -translate-y-1/2" },
        vertical: { base: "-top-12 left-1/2 -translate-x-1/2 rotate-90" },
      },
    },
  });
</script>
