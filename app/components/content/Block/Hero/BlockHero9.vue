<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-background" />
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[80px_80px]"
      />
    </div>

    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer
        class="relative z-10 flex min-h-screen flex-col items-center justify-center py-16 text-center"
      >
        <Motion as-child :variants="childVariant">
          <div
            class="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm"
          >
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"
              />
              <span class="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>Now in public beta</span>
          </div>
        </Motion>

        <Motion as-child :variants="childVariant">
          <h1 class="mx-auto mt-8 mb-6 max-w-4xl text-5xl font-bold lg:text-6xl xl:text-7xl">
            The modern way to build software
          </h1>
        </Motion>

        <Motion as-child :variants="childVariant">
          <p class="mx-auto max-w-2xl text-xl text-muted-foreground">
            Ship faster, collaborate better, and build products your customers love. Everything you
            need in one powerful platform.
          </p>
        </Motion>

        <Motion as-child :variants="childVariant">
          <div class="mt-10 flex flex-col gap-4 sm:flex-row">
            <UiButton size="lg" class="text-base">
              Start Building Now
              <Icon class="ml-2" name="lucide:arrow-right" />
            </UiButton>
            <UiButton size="lg" variant="outline" class="text-base">
              <Icon name="lucide:github" />
              View on GitHub
            </UiButton>
          </div>
        </Motion>

        <Motion as-child :variants="statsVariant">
          <div class="mt-16 grid grid-cols-3 gap-8 lg:gap-16">
            <div class="flex flex-col items-center">
              <p class="text-3xl font-bold lg:text-4xl">50K+</p>
              <p class="mt-1 text-sm text-muted-foreground">Active Users</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-3xl font-bold lg:text-4xl">99.9%</p>
              <p class="mt-1 text-sm text-muted-foreground">Uptime</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-3xl font-bold lg:text-4xl">24/7</p>
              <p class="mt-1 text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </Motion>
      </UiContainer>
    </Motion>
  </div>
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
        delayChildren: stagger(0.15),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 30 },
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

  const statsVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.5,
      },
    },
  };
</script>
