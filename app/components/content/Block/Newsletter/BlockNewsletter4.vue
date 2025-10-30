<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="containerVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <UiCard class="overflow-hidden py-0">
        <div class="grid gap-8 lg:grid-cols-2">
          <Motion as-child :variants="contentVariant">
            <div class="flex flex-col justify-center p-8 lg:p-12">
              <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
                Join 10,000+ Subscribers
              </h2>
              <p class="mb-6 text-lg text-muted-foreground">
                Get weekly insights, tips, and exclusive content delivered to your inbox. No spam,
                ever.
              </p>
              <form class="flex flex-col gap-3 sm:flex-row">
                <UiVeeInput
                  class="flex-1"
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Your email address"
                />
                <UiButton type="submit" class="whitespace-nowrap">Get Started</UiButton>
              </form>
              <div class="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:check-circle" class="size-5 text-primary" />
                  <span>Free forever</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:shield-check" class="size-5 text-primary" />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </Motion>
          <Motion as-child :variants="imageVariant">
            <div class="relative h-64 bg-linear-to-br from-primary/20 to-primary/5 lg:h-auto">
              <div class="absolute inset-0 flex items-center justify-center p-8">
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="i in 4" :key="i" class="h-24 w-24 rounded-lg bg-card shadow-lg"></div>
                </div>
              </div>
            </div>
          </Motion>
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
        delayChildren: stagger(0.15),
      },
    },
  };

  const contentVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const imageVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };
</script>
