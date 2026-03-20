<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="containerVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <UiCard class="relative overflow-hidden border-2">
        <div class="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-primary/10"></div>
        <div class="relative p-8 lg:p-12">
          <div class="mx-auto max-w-xl text-center">
            <Motion as-child :variants="childVariant">
              <div class="mb-6">
                <div
                  class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon name="lucide:sparkles" class="size-8 text-primary" />
                </div>
                <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
                  Don't miss out on our updates
                </h2>
                <p class="text-lg text-muted-foreground">
                  Join our community and be the first to know about new features, updates, and
                  special offers.
                </p>
              </div>
            </Motion>
            <Motion as-child :variants="childVariant">
              <form class="mb-6">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <UiVeeInput
                    class="flex-1"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    aria-label="Enter your email address"
                  />
                  <UiButton type="submit" size="lg" class="whitespace-nowrap">
                    Join Now
                    <Icon name="lucide:arrow-right" class="ml-2 size-4" />
                  </UiButton>
                </div>
              </form>
            </Motion>
            <Motion as-child :variants="childVariant">
              <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Icon name="lucide:users" class="size-4" />
                  <span>15K+ subscribers</span>
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Icon name="lucide:star" class="size-4" />
                  <span>4.9 rating</span>
                </div>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <Icon name="lucide:lock" class="size-4" />
                  <span>100% secure</span>
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </UiCard>
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
