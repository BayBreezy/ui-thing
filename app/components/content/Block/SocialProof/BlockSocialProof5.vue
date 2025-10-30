<template>
  <div class="overflow-hidden py-16 lg:py-24">
    <Motion
      initial="initial"
      in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer>
        <Motion as-child :variants="childVariant">
          <div class="mb-12 text-center">
            <h2 class="mb-4 text-3xl font-bold lg:text-4xl">
              Powering innovation at companies of all sizes
            </h2>
            <p class="text-lg text-muted-foreground">From startups to Fortune 500 companies</p>
          </div>
        </Motion>

        <!-- Scrolling logos animation -->
        <Motion as-child :variants="childVariant">
          <div class="relative">
            <div class="animate-marquee flex items-center gap-12">
              <template v-for="n in 2" :key="n">
                <div v-for="company in companies" :key="`${company.text}-${n}`" class="shrink-0">
                  <span class="sr-only">{{ company.text }}</span>
                  <Icon
                    :name="company.icon"
                    class="h-20 w-20 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              </template>
            </div>
          </div>
        </Motion>

        <Motion as-child :variants="statsVariant">
          <div class="mt-16 grid gap-8 md:grid-cols-3">
            <div class="text-center">
              <p class="mb-2 text-4xl font-bold">10,000+</p>
              <p class="text-muted-foreground">Companies worldwide</p>
            </div>
            <div class="text-center">
              <p class="mb-2 text-4xl font-bold">5M+</p>
              <p class="text-muted-foreground">Monthly active users</p>
            </div>
            <div class="text-center">
              <p class="mb-2 text-4xl font-bold">99.9%</p>
              <p class="text-muted-foreground">Customer satisfaction</p>
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

  const companies = [
    { text: "Company One", icon: "logos:100tb" },
    { text: "Company Two", icon: "logos:aha" },
    { text: "Company Three", icon: "logos:airbnb-icon" },
    { text: "Company Four", icon: "logos:akamai" },
    { text: "Company Five", icon: "logos:asana-icon" },
    { text: "Company Six", icon: "logos:atlassian" },
    { text: "Company Seven", icon: "logos:figma" },
    { text: "Company Eight", icon: "logos:discord-icon" },
  ];

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

  const statsVariant: MotionProps["variants"] = {
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
</script>

<style scoped>
  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }
</style>
