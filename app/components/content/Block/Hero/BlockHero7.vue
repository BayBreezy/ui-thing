<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="relative flex flex-col items-center py-10 text-center lg:py-20">
      <Motion :variants="childVariant">
        <UiBadge to="#" variant="outline" class="px-3 py-1.5 text-sm font-normal lg:py-2"
          >New feature! Check out our new dashboard
          <Icon class="ml-3 size-4" name="lucide:arrow-right"
        /></UiBadge>
      </Motion>

      <Motion as-child :variants="childVariant">
        <h1
          class="mt-7 mb-4 text-4xl font-bold lg:mt-5 lg:mb-6 lg:text-center lg:text-5xl xl:text-6xl"
        >
          High-performing remote teams.<br />The future of work.
        </h1>
      </Motion>
      <Motion as-child :variants="childVariant">
        <p class="text-muted-foreground mx-auto max-w-[760px] text-lg lg:text-center lg:text-xl">
          Powerful, self-serve team engagement tools and analytics. Supercharge your managers & keep
          employees engaged from anywhere.
        </p>
      </Motion>

      <Motion as-child :variants="childVariant">
        <div
          class="mt-8 grid w-full grid-cols-1 items-center gap-3 sm:flex sm:justify-center lg:mt-10"
        >
          <UiButton size="lg" variant="outline"> <Icon name="lucide:play-circle" /> Demo </UiButton>
          <UiButton size="lg">Sign up</UiButton>
        </div>
      </Motion>

      <Motion as-child :variants="childVariant">
        <div
          class="mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-md lg:mt-10 lg:h-[520px] lg:w-[900px] lg:rounded-lg"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/7RaKVu72ncY?si=QoEOhOEe4FE4H9Es"
            :title="`${COMPANY_NAME} hero section seven video`"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            allowfullscreen
          />
        </div>
      </Motion>
    </UiContainer>
  </Motion>
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
