<template>
  <UiButton
    :disabled="!canScrollNext"
    :class="styles().base({ orientation, class: props.class })"
    :variant
    @click="scrollNext"
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
      icon: "lucide:arrow-right",
      srText: "Next Slide",
      variant: "outline",
    }
  );

  const { orientation, canScrollNext, scrollNext } = useCarousel();

  const styles = tv({
    slots: {
      base: "absolute h-8 w-8 touch-manipulation rounded-full p-0",
      icon: "size-4 text-current",
    },
    variants: {
      orientation: {
        horizontal: { base: "-right-12 top-1/2 -translate-y-1/2" },
        vertical: { base: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90" },
      },
    },
  });
</script>
