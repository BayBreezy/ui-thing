<template>
  <!-- 
    Career section with image showcase
    Features: Centered header, job list with team image, visual appeal
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
    <UiContainer class="pb-16">
      <UiContainer class="py-16 text-center lg:py-24">
        <Motion as="p" :variants="childVariant" class="text-primary font-semibold">
          We're hiring!
        </Motion>
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
        >
          Join our team
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="text-muted-foreground mx-auto max-w-[768px] text-lg lg:text-xl"
        >
          Our philosophy is simple — hire a team of diverse, passionate people and foster a culture
          that empowers you to do your best work.
        </Motion>
      </UiContainer>
      <div class="flex flex-col gap-x-16 gap-y-16 lg:flex-row">
        <ul class="flex w-full flex-col gap-8 lg:w-1/2">
          <Motion
            v-for="n in 4"
            :key="n"
            :variants="childVariant"
            :transition="{
              delay: n * 0.05,
            }"
            as="li"
            class="group hover:border-primary/50 border-t pt-6 transition-colors"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="group-hover:text-primary text-lg font-semibold transition-colors"
                >Product Designer</span
              >
              <UiBadge class="text-sm font-medium" variant="outline">Design</UiBadge>
            </div>
            <p class="text-muted-foreground mt-2">
              We're looking for a mid-level product designer to join our team.
            </p>
            <ul class="mt-5 flex flex-wrap items-center gap-5">
              <li class="text-muted-foreground flex items-center gap-2">
                <Icon class="opacity-80" name="heroicons:map-pin" /> Remote
              </li>
              <li class="text-muted-foreground flex items-center gap-2">
                <Icon class="opacity-80" name="heroicons:clock" /> Full-time
              </li>
              <li class="md:ml-auto">
                <UiButton
                  variant="ghost"
                  size="sm"
                  class="group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Learn more
                  <Icon
                    name="lucide:arrow-right"
                    class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </UiButton>
              </li>
            </ul>
          </Motion>
        </ul>
        <Motion
          :variants="{
            initial: { opacity: 0, x: 30 },
            animate: {
              opacity: 1,
              x: 0,
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 25,
              },
            },
          }"
          class="w-full lg:w-1/2"
        >
          <img
            src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Careers image"
            height="650"
            width="600"
            loading="lazy"
            class="h-[250px] w-full rounded-lg object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl lg:h-full"
          />
        </Motion>
      </div>
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
