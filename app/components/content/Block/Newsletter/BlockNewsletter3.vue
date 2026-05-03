<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="containerVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <Motion as-child :variants="childVariant">
          <UiBadge variant="secondary" class="mb-4">Newsletter</UiBadge>
        </Motion>
        <Motion as-child :variants="childVariant">
          <h2 class="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Stay in the loop
          </h2>
        </Motion>
        <Motion as-child :variants="childVariant">
          <p class="text-muted-foreground mb-8 text-lg lg:text-xl">
            Join our newsletter to get the latest updates, exclusive content, and special offers
            delivered straight to your inbox.
          </p>
        </Motion>
        <Motion as-child :variants="childVariant">
          <form class="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <UiVeeInput
              class="flex-1"
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Enter your email"
            />
            <UiButton type="submit" class="whitespace-nowrap">Subscribe Now</UiButton>
          </form>
        </Motion>
        <Motion as-child :variants="childVariant">
          <p class="text-muted-foreground mt-4 text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const containerVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
      },
    },
  };

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
