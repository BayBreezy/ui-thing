<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="pb-10">
      <UiContainer class="py-16 text-center lg:py-24">
        <slot name="headline">
          <Motion as-child :variants="childVariant">
            <p v-if="headline" class="font-semibold text-primary">{{ headline }}</p>
          </Motion>
        </slot>
        <slot name="title">
          <Motion as-child :variants="childVariant">
            <h2 class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">{{ title }}</h2>
          </Motion>
        </slot>
        <slot name="description">
          <Motion as-child :variants="childVariant">
            <p class="mx-auto max-w-[768px] text-lg text-muted-foreground lg:text-xl">
              {{ description }}
            </p>
          </Motion>
        </slot>
        <Motion as-child :variants="childVariant">
          <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row">
            <UiButton variant="outline">About us</UiButton>
            <UiButton>Open positions</UiButton>
          </div>
        </Motion>
      </UiContainer>
      <section class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
        <Motion v-for="n in 8" :key="n" as-child :variants="cardVariant">
          <div class="flex flex-col">
            <UiAvatar
              class="mb-5 h-72 w-full rounded-md"
              :src="`https://i.pravatar.cc/450?img=${n + 10}`"
            />
            <p class="text-lg font-semibold">Jane Doe</p>
            <p class="text-primary">Marketing Manager</p>
            <p class="mt-2 text-muted-foreground">
              Lead engineering teams at Figma, Pitch, and Protocol Labs.
            </p>
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
