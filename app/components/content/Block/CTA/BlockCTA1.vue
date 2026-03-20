<template>
  <!-- 
    Centered CTA with dual buttons
    Features: Centered layout, staggered animations, action buttons
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
    <UiContainer class="flex flex-col items-center py-16 text-center lg:py-24">
      <Motion
        as="h3"
        :variants="childVariant"
        class="mb-4 text-3xl font-semibold md:mb-5 md:text-4xl"
      >
        Start your free trial
      </Motion>
      <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground md:text-xl">
        Join over 4,000+ startups already growing with {{ COMPANY_NAME }}.
      </Motion>
      <Motion
        :variants="childVariant"
        class="mt-8 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row"
      >
        <UiButton size="lg" class="w-full lg:w-auto" variant="outline">Learn more</UiButton>
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
