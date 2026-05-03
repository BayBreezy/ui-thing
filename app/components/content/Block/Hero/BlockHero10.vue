<template>
  <div class="bg-muted/30 relative min-h-screen overflow-hidden">
    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer class="grid min-h-screen items-center gap-8 py-16 lg:grid-cols-2 lg:gap-16">
        <Motion as-child :variants="contentVariant">
          <div>
            <h1 class="mb-6 text-5xl font-bold lg:text-6xl xl:text-7xl">
              Ship products faster than ever
            </h1>
            <p class="text-muted-foreground mb-8 text-xl">
              Join 10,000+ teams building the future with our platform. From startups to
              enterprises, we've got you covered.
            </p>
            <form class="mb-8 flex flex-col gap-3 sm:flex-row">
              <UiVeeInput
                class="flex-1"
                placeholder="Enter your email"
                aria-label="Enter your email"
                required
              />
              <UiButton size="lg" type="submit">Get Early Access</UiButton>
            </form>
            <div class="flex flex-wrap items-center gap-6">
              <div class="flex items-center gap-2">
                <Icon class="text-primary size-5" name="lucide:shield-check" />
                <span class="text-muted-foreground text-sm">SOC 2 Certified</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon class="text-primary size-5" name="lucide:lock" />
                <span class="text-muted-foreground text-sm">256-bit Encryption</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon class="text-primary size-5" name="lucide:award" />
                <span class="text-muted-foreground text-sm">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </Motion>

        <Motion as-child :variants="imageVariant">
          <div class="relative">
            <div
              class="from-primary/20 to-primary/10 absolute -inset-4 rounded-2xl bg-linear-to-r blur-2xl"
            />
            <div class="bg-background relative overflow-hidden rounded-2xl border shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                alt="Product showcase"
                class="h-full w-full object-cover"
                loading="eager"
                width="800"
                height="600"
                :title="`${COMPANY_NAME} product showcase`"
              />
            </div>
          </div>
        </Motion>
      </UiContainer>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };
</script>
