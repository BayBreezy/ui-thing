<template>
  <Motion initial="initial" while-in-view="animate" as-child :variants="parentVariant">
    <UiContainer class="py-16 lg:py-24">
      <div class="mx-auto max-w-[760px]">
        <Motion :variants="childVariant" class="text-center">
          <UiBadge variant="outline" class="gap-2 px-3 py-1.5 text-sm font-normal"
            ><Icon name="lucide:circle-dot" class="text-primary size-4" /> Features</UiBadge
          >
        </Motion>
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-3 mb-4 text-center text-3xl font-semibold lg:mt-7 lg:mb-5 lg:text-4xl"
        >
          Cutting-edge features for advanced analytics
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="text-muted-foreground mx-auto max-w-[760px] text-center text-lg lg:text-xl"
        >
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain
          more users. Trusted by over 4,000 startups.
        </Motion>
      </div>

      <Motion :variants="childVariant">
        <img
          src="https://images.unsplash.com/photo-1608411404720-c8f0417bcdba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cutting edge feature"
          width="700"
          height="600"
          class="mx-auto mt-12 h-[300px] w-full rounded-lg object-cover shadow-xs drop-shadow-md lg:mt-16 lg:h-[520px] lg:w-[770px]"
        />
      </Motion>

      <Motion
        as="div"
        class="my-12 grid grid-cols-1 gap-y-10 lg:my-24 lg:grid-cols-3 lg:gap-8 lg:gap-y-16"
        :variants="parentVariant"
        initial="initial"
        while-in-view="animate"
      >
        <Motion
          v-for="(f, i) in features"
          :key="i"
          class="group flex flex-col items-center"
          :variants="childVariant"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-md border">
            <Icon
              :name="f.icon"
              class="group-hover:text-primary h-5 w-5 transition-colors lg:h-6 lg:w-6"
            />
          </div>
          <h3 class="mt-4 text-center text-lg font-semibold lg:mt-5 lg:text-xl" v-text="f.title" />
          <p
            class="text-muted-foreground mt-1 max-w-[500px] text-center text-balance lg:mt-2"
            v-text="f.description"
          />
          <NuxtLink
            class="text-primary mt-4 inline-flex items-center gap-2 font-semibold underline-offset-2 hover:underline lg:mt-5"
            :to="f.link.url"
            >{{ f.link.text }}
            <Icon
              name="heroicons:arrow-right"
              class="size-4 transition-transform group-hover:translate-x-1"
            />
          </NuxtLink>
        </Motion>
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
        when: "beforeChildren",
        delayChildren: stagger(0.1),
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
      link: { text: "Learn more", url: "#" },
    },
    {
      icon: "heroicons:bolt",
      title: "Deliver instant answers",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
      link: { text: "Learn more", url: "#" },
    },
    {
      icon: "heroicons:cursor-arrow-rays",
      title: "Manage your team with reports",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
      link: { text: "Learn more", url: "#" },
    },
  ];
</script>
