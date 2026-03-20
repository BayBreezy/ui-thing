<template>
  <UiContainer class="py-16 lg:py-24">
    <Motion
      as="div"
      class="grid grid-cols-1 gap-y-10 md:gap-8 md:py-10 lg:grid-cols-3"
      :variants="{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { delayChildren: stagger(0.15) } },
      }"
      initial="initial"
      while-in-view="animate"
    >
      <div
        v-for="(f, i) in features"
        :key="i"
        class="group flex flex-col items-center justify-center"
      >
        <Motion
          :variants="itemVariant"
          class="flex h-12 w-12 items-center justify-center rounded-md border"
        >
          <Icon
            :name="f.icon"
            class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
          />
        </Motion>
        <Motion
          as-child
          :variants="itemVariant"
          class="mt-4 text-center text-lg font-semibold text-balance lg:mt-5 lg:text-xl"
        >
          <h3 v-html="f.title"
        /></Motion>
        <Motion
          as-child
          class="mt-1 max-w-[400px] text-center text-balance text-muted-foreground lg:mt-2 lg:max-w-none"
          :variants="itemVariant"
        >
          <p v-html="f.description" />
        </Motion>
      </div>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const itemVariant: MotionProps["variants"] = {
    initial: { opacity: 0, x: -20 },
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

  const features = [
    {
      icon: "heroicons:chat-bubble-left-right",
      title: "Share team inboxes",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    },
    {
      icon: "heroicons:bolt",
      title: "Deliver instant answers",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    },
    {
      icon: "heroicons:cursor-arrow-rays",
      title: "Manage your team with reports",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
    },
  ];
</script>
