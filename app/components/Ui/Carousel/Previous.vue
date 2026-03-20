<template>
  <UiButton
    :disabled="!canScrollPrev"
    data-slot="carousel-previous"
    :class="styles().base({ orientation, class: normalizeClass(props.class) || undefined })"
    :variant
    @click="scrollPrev"
  >
    <slot>
      <Icon
        :name="props.icon"
        :class="styles().icon({ orientation, class: normalizeClass(props.iconClass) || undefined })"
      />
      <span class="sr-only">{{ props.srText }}</span>
    </slot>
  </UiButton>
</template>

<script setup lang="ts">
  import { normalizeClass } from "vue";
  import type { buttonStyles } from "~/components/Ui/Button.vue";
  import type { WithClassAsProps } from "~/composables/useCarousel";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      WithClassAsProps & {
        /** The icon to display in the button
         *
         * @default "lucide:arrow-left"
         */
        icon?: string;
        /** The screen reader text
         *
         * @default "Previous Slide"
         */
        srText?: string;
        /** Custom class(es) to add to the icon */
        iconClass?: HTMLAttributes["class"];
        /** The variant of the button
         *
         * @default "outline"
         */
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
        horizontal: { base: "top-1/2 -left-12 -translate-y-1/2" },
        vertical: { base: "-top-12 left-1/2 -translate-x-1/2 rotate-90" },
      },
    },
  });
</script>
