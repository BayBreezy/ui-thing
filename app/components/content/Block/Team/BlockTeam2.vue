<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="pb-10">
      <UiContainer class="py-16 text-center lg:py-24">
        <slot name="headline">
          <Motion as-child :variants="childVariant">
            <p class="text-primary font-semibold">{{ headline }}</p>
          </Motion>
        </slot>
        <slot name="title">
          <Motion as-child :variants="childVariant">
            <h2 class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">{{ title }}</h2>
          </Motion>
        </slot>
        <slot name="description">
          <Motion as-child :variants="childVariant">
            <p class="text-muted-foreground mx-auto max-w-[768px] text-lg lg:text-xl">
              {{ description }}
            </p>
          </Motion>
        </slot>
      </UiContainer>
      <section
        class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12 xl:grid-cols-4"
      >
        <Motion v-for="n in 9" :key="n" as-child :variants="cardVariant">
          <div class="flex flex-col">
            <UiAvatar
              class="ring-ring/20 mb-5 h-24 w-24 ring-1"
              :src="`https://i.pravatar.cc/150?img=${n}`"
            />
            <p class="text-lg font-semibold">Jane Doe</p>
            <p class="text-primary">Marketing Manager</p>
            <ul class="text-muted-foreground mt-2">
              <li>Former co-founder of Opendoor.</li>
              <li>Early staff at Spotify and Clearbit.</li>
            </ul>
            <div class="mt-2 flex items-center gap-3">
              <Icon name="logos:twitter" class="text-muted-foreground h-5 w-5" />
              <Icon name="logos:linkedin-icon" class="text-muted-foreground h-5 w-5" />
              <Icon name="logos:dribbble-icon" class="text-muted-foreground h-5 w-5" />
            </div>
          </div>
        </Motion>
      </section>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const headline = "We're hiring!";
  const title = "Some of the people you'll be working with";
  const description = "We're a 100% remote team spread all across the world. Join us!";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.08),
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
