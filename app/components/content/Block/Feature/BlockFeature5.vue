<template>
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
    <UiContainer class="py-16 lg:py-24">
      <Motion :variants="childVariant" :transition="{ duration: 0.5 }">
        <div class="max-w-[760px]">
          <Motion as="p" :variants="childVariant" class="font-semibold text-primary"
            >Features</Motion
          >
          <Motion
            as="h2"
            :variants="childVariant"
            class="mt-3 mb-4 text-3xl font-semibold lg:mb-5 lg:text-4xl"
          >
            Beautiful analytics to grow smarter
          </Motion>
          <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
            Powerful, self-serve product and growth analytics to help you convert, engage, and
            retain more users. Trusted by over 4,000 startups.
          </Motion>
        </div>
      </Motion>

      <div
        class="grid grid-cols-1 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16"
      >
        <Motion
          v-for="(f, i) in features"
          :key="i"
          class="group flex flex-col"
          :variants="childVariant"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-md border">
            <Icon
              :name="f.icon"
              class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
            />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-balance lg:mt-5 lg:text-xl" v-html="f.title" />
          <p class="mt-1 text-balance text-muted-foreground lg:mt-2" v-html="f.description" />
          <NuxtLink
            class="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
            :to="f.link.to"
            >{{ f.link.text }}
            <Icon
              name="heroicons:arrow-right"
              class="size-4 transition-transform group-hover:translate-x-1"
          /></NuxtLink>
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
  const features = [
    {
      icon: "lucide:message-square-dot",
      title: "Share team inboxes",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "lucide:zap",
      title: "Deliver instant answers",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "lucide:mouse-pointer-click",
      title: "Manage your team with reports",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "lucide:users",
      title: "Connect with customers",
      description:
        "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "lucide:square-terminal",
      title: "Connect the tools you already use",
      description:
        "Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "lucide:heart",
      title: "Our people make the difference",
      description:
        "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
      link: { text: "Learn more", to: "#" },
    },
  ];
</script>
