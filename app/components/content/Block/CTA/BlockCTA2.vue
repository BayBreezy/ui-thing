<template>
  <!-- 
    Horizontal CTA with side-by-side layout
    Features: Text left, buttons right, responsive stacking, animations
  -->
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <UiContainer class="flex flex-col items-center py-16 lg:flex-row lg:py-24">
      <Motion :variants="childVariant" class="grow text-center lg:text-left">
        <h3 class="mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl">Start your free trial</h3>
        <p class="text-muted-foreground text-lg lg:text-xl">
          Join over 4,000+ startups already growing with {{ COMPANY_NAME }}.
        </p>
      </Motion>
      <Motion
        :variants="childVariant"
        class="mt-8 flex w-full shrink-0 flex-col-reverse justify-center gap-3 md:w-auto md:flex-row lg:mt-0"
      >
        <UiButton size="lg" class="w-full md:w-auto" variant="outline">Learn more</UiButton>
        <UiButton size="lg" class="w-full whitespace-nowrap md:w-auto">
          Get started
          <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
        </UiButton>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
