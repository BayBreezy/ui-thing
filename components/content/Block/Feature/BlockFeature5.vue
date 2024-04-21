<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="max-w-[760px]">
      <p class="font-semibold text-primary">Features</p>
      <h2 class="mb-4 mt-3 text-3xl font-semibold lg:mb-5 lg:text-4xl">
        Beautiful analytics to grow smarter
      </h2>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Powerful, self-serve product and growth analytics to help you convert, engage, and retain
        more users. Trusted by over 4,000 startups.
      </p>
    </div>

    <div
      class="grid grid-cols-1 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16"
    >
      <template v-for="(f, i) in features" :key="i">
        <div class="group flex flex-col">
          <div class="flex h-12 w-12 items-center justify-center rounded-md border">
            <Icon
              :name="f.icon"
              class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
            />
          </div>
          <h3 class="mt-4 text-balance text-lg font-semibold lg:mt-5 lg:text-xl" v-html="f.title" />
          <p class="mt-1 text-balance text-muted-foreground lg:mt-2" v-html="f.description" />
          <NuxtLink
            class="mt-4 inline-block font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
            :to="f.link.to"
            >{{ f.link.text }} <Icon name="heroicons:arrow-right" class="h-4 w-4"
          /></NuxtLink>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const features = [
    {
      icon: "heroicons:chat-bubble-left-right",
      title: "Share team inboxes",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "heroicons:bolt",
      title: "Deliver instant answers",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "heroicons:cursor-arrow-rays",
      title: "Manage your team with reports",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "heroicons:users",
      title: "Connect with customers",
      description:
        "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "heroicons:command-line",
      title: "Connect the tools you already use",
      description:
        "Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.",
      link: { text: "Learn more", to: "#" },
    },
    {
      icon: "heroicons:heart",
      title: "Our people make the difference",
      description:
        "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
      link: { text: "Learn more", to: "#" },
    },
  ];
</script>
