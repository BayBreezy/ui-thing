<template>
  <!-- 
    Simple centered career listing
    Features: Centered header, clean job list with badges, location and employment type
  -->
  <Motion
    initial="initial"
    in-view="animate"
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
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
        >
          Open positions
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
        >
          We're a 100% remote team spread all across the world. Join us!
        </Motion>
      </UiContainer>

      <ul class="mx-auto flex max-w-[768px] flex-col gap-8">
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
                class="group-hover:bg-primary group-hover:text-primary-foreground hover:bg-primary/90"
              >
                View details
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
