<template>
  <UiButton
    :disabled="!canScrollNext"
    data-slot="carousel-next"
    :class="styles().base({ orientation, class: normalizeClass(props.class) || undefined })"
    :variant
    @click="scrollNext"
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
        /** The icon to display in the button */
        icon?: string;
        /** The screen reader text
         *
         * @default "Next Slide"
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
        horizontal: { base: "top-1/2 -right-12 -translate-y-1/2" },
        vertical: { base: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90" },
      },
    },
  });
</script>
