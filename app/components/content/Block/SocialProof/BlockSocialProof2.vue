<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <Motion as-child :variants="childVariant">
        <div class="mb-12 text-center">
          <h2 class="mb-3 text-3xl font-bold lg:text-4xl">Trusted by industry leaders</h2>
          <p class="text-lg text-muted-foreground">
            Over 10,000+ companies use our platform to grow their business
          </p>
        </div>
      </Motion>

      <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
        <Motion v-for="company in companies" :key="company.text" as-child :variants="cardVariant">
          <div
            class="flex items-center justify-center rounded-lg border bg-card p-6 hover:border-primary/50 hover:shadow-md"
          >
            <span class="sr-only">{{ company.text }}</span>
            <Icon :name="company.icon" class="h-16 w-16 lg:h-20 lg:w-20" />
          </div>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
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

  const cardVariant: MotionProps["variants"] = {
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
