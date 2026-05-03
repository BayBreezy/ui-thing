<template>
  <div class="bg-muted/30 py-16 lg:py-24">
    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer>
        <div class="mb-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          <Motion as-child :variants="contentVariant">
            <div>
              <p class="text-primary mb-3 font-semibold">Join Our Team</p>
              <h2 class="mb-4 text-4xl font-bold lg:text-5xl">
                Work with talented people from around the world
              </h2>
              <p class="text-muted-foreground mb-6 text-lg">
                We're a diverse team of designers, developers, and dreamers building the future
                together. Remote-first, mission-driven, and always learning.
              </p>
              <UiButton size="lg">
                View Open Positions
                <Icon class="ml-2" name="lucide:arrow-right" />
              </UiButton>
            </div>
          </Motion>

          <Motion as-child :variants="statsVariant">
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-card rounded-lg border p-6">
                <p class="mb-2 text-3xl font-bold">50+</p>
                <p class="text-muted-foreground text-sm">Team Members</p>
              </div>
              <div class="bg-card rounded-lg border p-6">
                <p class="mb-2 text-3xl font-bold">15+</p>
                <p class="text-muted-foreground text-sm">Countries</p>
              </div>
              <div class="bg-card rounded-lg border p-6">
                <p class="mb-2 text-3xl font-bold">100%</p>
                <p class="text-muted-foreground text-sm">Remote</p>
              </div>
              <div class="bg-card rounded-lg border p-6">
                <p class="mb-2 text-3xl font-bold">4.9★</p>
                <p class="text-muted-foreground text-sm">Glassdoor Rating</p>
              </div>
            </div>
          </Motion>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Motion v-for="n in 8" :key="n" as-child :variants="memberVariant">
            <div class="group relative overflow-hidden rounded-lg">
              <div class="aspect-square overflow-hidden">
                <img
                  :src="`https://i.pravatar.cc/300?img=${n + 30}`"
                  alt="Team member"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 text-white"
              >
                <p class="font-semibold">Jane Doe</p>
                <p class="text-sm opacity-90">Senior Developer</p>
              </div>
            </div>
          </Motion>
        </div>
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
        delayChildren: stagger(0.1),
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

  const statsVariant: MotionProps["variants"] = {
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

  const memberVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
