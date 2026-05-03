<template>
  <!-- 
    App download CTA with mockup
    Features: Mobile app showcase, platform buttons, phone mockup, animations
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
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <UiContainer
      class="relative flex flex-col items-center justify-between gap-y-12 py-16 lg:h-[720px] lg:flex-row lg:pt-24"
    >
      <Motion :variants="childVariant" class="flex h-full items-center justify-center">
        <div>
          <h3 class="text-center text-3xl font-semibold lg:text-left lg:text-5xl">
            Growth performance tracking made easy
          </h3>
          <p class="text-muted-foreground my-5 text-center text-lg md:text-xl lg:my-8 lg:text-left">
            Start your 30-day free trial today.
          </p>
          <div class="grid gap-2 md:flex md:justify-center lg:justify-start">
            <UiButton variant="outline" class="h-11 transition-transform hover:scale-101">
              <Icon name="mdi:apple" class="h-6 w-6" />
              <span>Download for iOS</span>
            </UiButton>
            <UiButton variant="outline" class="h-11 transition-transform hover:scale-101">
              <Icon name="ion:logo-google-playstore" class="h-6 w-6" />
              <span>Download for Android</span>
            </UiButton>
          </div>
        </div>
      </Motion>

      <Motion
        :variants="{
          initial: { opacity: 0, y: 30 },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 25,
            },
          },
        }"
        class="mx-auto h-[360px] w-full object-cover object-top sm:w-[400px] lg:h-[640px] lg:w-full lg:object-contain"
      >
        <img
          src="/phone-mockup.png"
          alt="Mobile phone mockup"
          class="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
        />
      </Motion>
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
