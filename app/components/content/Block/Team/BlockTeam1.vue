<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer>
      <UiContainer class="py-16 text-center lg:py-24">
        <slot name="headline">
          <Motion v-if="headline" as-child :variants="childVariant">
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
        <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 lg:w-auto lg:flex-row">
          <slot />
        </div>
      </UiContainer>
      <section
        class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12 xl:grid-cols-4"
      >
        <Motion v-for="n in 6" :key="n" as-child :variants="cardVariant">
          <div class="flex flex-col items-center">
            <UiAvatar
              class="ring-ring/20 mb-5 h-24 w-24 ring-1"
              :src="`https://i.pravatar.cc/150?img=${n + 10}`"
            />
            <p class="text-lg font-semibold">Jane Doe</p>
            <p class="text-primary">Marketing Manager</p>
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
  const title = "Meet our team";
  const description =
    "Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.";

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
