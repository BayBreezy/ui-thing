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

      <div
        class="grid grid-cols-1 gap-y-12 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 lg:py-20"
      >
        <Motion
          as="div"
          class="flex flex-col gap-10 lg:gap-12"
          :variants="parentVariant"
          initial="initial"
          while-in-view="animate"
        >
          <Motion
            v-for="(f, i) in features1"
            :key="i"
            class="group flex flex-col"
            :variants="{
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
            }"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="group-hover:text-primary h-5 w-5 transition-colors lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-lg font-semibold text-balance lg:mt-5 lg:text-xl"
              v-text="f.title"
            />
            <p class="text-muted-foreground mt-1 text-balance lg:mt-2" v-text="f.description" />
            <NuxtLink
              class="text-primary mt-4 inline-flex items-center gap-2 font-semibold underline-offset-2 hover:underline lg:mt-5"
              :to="f.link.url"
              >{{ f.link.text }}
              <Icon
                name="heroicons:arrow-right"
                class="size-4 transition-transform group-hover:translate-x-1"
            /></NuxtLink>
          </Motion>
        </Motion>

        <Motion
          :variants="{
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
          }"
          :transition="{ duration: 0.6, delay: 0.3 }"
          class="order-last col-span-full lg:order-0 lg:col-span-1"
        >
          <img
            src="/phone-mockup.png"
            alt="Features section nine image"
            class="mx-auto h-[360px] w-[400px] object-cover object-top lg:h-[640px] lg:w-full lg:object-contain"
          />
        </Motion>

        <Motion
          as="div"
          class="flex flex-col gap-10 lg:gap-12"
          :variants="parentVariant"
          initial="initial"
          while-in-view="animate"
        >
          <Motion
            v-for="(f, i) in features2"
            :key="i"
            class="group flex flex-col"
            :variants="{
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
            }"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="group-hover:text-primary h-5 w-5 transition-colors lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-lg font-semibold text-balance lg:mt-5 lg:text-xl"
              v-text="f.title"
            />
            <p class="text-muted-foreground mt-1 text-balance lg:mt-2" v-text="f.description" />
            <NuxtLink
              class="text-primary mt-4 inline-flex items-center gap-2 font-semibold underline-offset-2 hover:underline lg:mt-5"
              :to="f.link.url"
              >{{ f.link.text }}
              <Icon
                name="heroicons:arrow-right"
                class="size-4 transition-transform group-hover:translate-x-1"
            /></NuxtLink>
          </Motion>
        </Motion>
      </div>
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
  const features1 = [
    {
      icon: "lucide:message-square-dot",
      title: "Share team inboxes",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      link: { text: "Learn more", url: "#" },
    },
    {
      icon: "lucide:zap",
      title: "Deliver instant answers",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
      link: { text: "Learn more", url: "#" },
    },
  ];
  const features2 = [
    {
      icon: "lucide:mouse-pointer-click",
      title: "Manage your team with reports",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
      link: { text: "Learn more", url: "#" },
    },
    {
      icon: "lucide:users",
      title: "Connect with customers",
      description:
        "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
      link: { text: "Learn more", url: "#" },
    },
  ];
</script>
