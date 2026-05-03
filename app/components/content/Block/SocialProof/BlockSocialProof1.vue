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
        <p class="text-muted-foreground mb-8 text-center">Join 4,000+ companies already growing</p>
      </Motion>
      <div class="flex flex-wrap items-center justify-center gap-5">
        <Motion v-for="n in companies" :key="n.text" as-child :variants="logoVariant">
          <div>
            <span class="sr-only">{{ n.text }}</span>
            <Icon :name="n.icon" class="h-24 w-24 transition-opacity hover:opacity-70" />
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
    { text: "Company Three", icon: "logos:airbnb" },
    { text: "Company Four", icon: "logos:akamai" },
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

  const logoVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0.8 },
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
