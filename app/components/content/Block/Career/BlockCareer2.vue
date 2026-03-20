<template>
  <!-- 
    Two-column career section with left header
    Features: Side-by-side layout, descriptive header, job listings with badges
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
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <UiContainer class="flex flex-col gap-x-16 py-16 lg:flex-row lg:py-24">
      <Motion :variants="childVariant" class="w-full pb-16 lg:w-1/2 lg:pb-0">
        <UiContainer class="text-center lg:text-left">
          <p class="font-semibold text-primary">We're hiring!</p>
          <h2 class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">Join our team</h2>
          <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:mx-0 lg:text-xl">
            Our philosophy is simple — hire a team of diverse, passionate people and foster a
            culture that empowers you to do your best work.
          </p>
        </UiContainer>
      </Motion>

      <ul class="flex w-full flex-col gap-8 lg:w-1/2">
        <Motion
          v-for="n in 4"
          :key="n"
          :variants="childVariant"
          :transition="{
            delay: n * 0.05,
          }"
          as="li"
          class="group border-t pt-6 transition-colors hover:border-primary/50"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-lg font-semibold transition-colors group-hover:text-primary"
              >Product Designer</span
            >
            <UiBadge class="text-sm font-medium" variant="outline">Design</UiBadge>
          </div>
          <p class="mt-2 text-muted-foreground">
            We're looking for a mid-level product designer to join our team.
          </p>
          <ul class="mt-5 flex flex-wrap items-center gap-5">
            <li class="flex items-center gap-2 text-muted-foreground">
              <Icon class="opacity-80" name="heroicons:map-pin" /> Remote
            </li>
            <li class="flex items-center gap-2 text-muted-foreground">
              <Icon class="opacity-80" name="heroicons:clock" /> Full-time
            </li>
            <li class="md:ml-auto">
              <UiButton
                variant="ghost"
                size="sm"
                class="group-hover:bg-primary group-hover:text-primary-foreground"
              >
                Apply now
                <Icon
                  name="lucide:arrow-right"
                  class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </UiButton>
            </li>
          </ul>
        </Motion>
      </ul>
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
