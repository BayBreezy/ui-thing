<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="relative py-16 text-center lg:py-24">
      <Motion as-child :variants="childVariant">
        <UiBadge variant="secondary" class="px-3 py-1.5 text-sm font-normal lg:py-2">
          <Icon class="mr-2 size-4" name="lucide:sparkles" />
          Introducing our new AI features
        </UiBadge>
      </Motion>

      <Motion as-child :variants="childVariant">
        <h1
          class="mx-auto mt-7 mb-4 max-w-4xl text-4xl font-bold lg:mt-5 lg:mb-6 lg:text-5xl xl:text-6xl"
        >
          Build your dream product with our amazing tools
        </h1>
      </Motion>

      <Motion as-child :variants="childVariant">
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl">
          The most powerful platform for teams to build, ship, and scale their products. Join
          thousands of companies already using our tools.
        </p>
      </Motion>

      <Motion as-child :variants="childVariant">
        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:mt-10">
          <UiButton size="lg">
            <Icon name="lucide:rocket" />
            Get Started Free
          </UiButton>
          <UiButton size="lg" variant="outline">
            <Icon name="lucide:book-open" />
            View Documentation
          </UiButton>
        </div>
      </Motion>

      <Motion as-child :variants="childVariant">
        <div class="mt-10 flex flex-wrap items-center justify-center gap-8 lg:mt-16">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon class="size-5 text-green-600" name="lucide:check-circle-2" />
            <span>No credit card required</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon class="size-5 text-green-600" name="lucide:check-circle-2" />
            <span>14-day free trial</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon class="size-5 text-green-600" name="lucide:check-circle-2" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </Motion>

      <Motion as-child :variants="imageVariant">
        <div
          class="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border bg-muted/30 shadow-2xl lg:mt-16"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            alt="Dashboard preview"
            class="h-full w-full object-cover"
            loading="eager"
            width="1200"
            height="675"
            :title="`${COMPANY_NAME} dashboard preview`"
          />
        </div>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
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

  const imageVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };
</script>
