<template>
  <UiContainer class="relative py-16 lg:py-24">
    <div class="max-w-[760px]">
      <p class="font-semibold text-primary">Features</p>
      <h2 class="mb-4 mt-3 text-3xl font-semibold lg:mb-5 lg:text-4xl">
        Overflowing with useful features
      </h2>
      <p class="max-w-[800px] text-balance text-lg text-muted-foreground lg:text-xl">
        Powerful, self-serve product and growth analytics to help you convert, engage, and retain
        more users. Trusted by over 4,000 startups.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-y-12 py-10 lg:grid-cols-2 lg:gap-x-10 lg:py-20">
      <div class="grid grid-cols-1 gap-y-10 lg:gap-8 lg:gap-y-12">
        <template v-for="(f, i) in features" :key="i">
          <div class="group flex gap-5">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="h-5 w-5 transition-colors group-hover:text-primary lg:h-5 lg:w-5"
              />
            </div>
            <div class="grow">
              <h3 class="text-lg font-semibold lg:text-xl" v-text="f.title" />
              <p
                class="mt-1 max-w-[600px] text-muted-foreground lg:mt-2 lg:max-w-none"
                v-text="f.description"
              />
              <NuxtLink
                class="mt-4 inline-block font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
                :to="f.link.url"
                >{{ f.link.text }} <Icon name="heroicons:arrow-right" class="h-4 w-4"
              /></NuxtLink>
            </div>
          </div>
        </template>
      </div>
      <div class="">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="https://images.unsplash.com/photo-1626908013351-800ddd734b8a?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Share team inboxes feature"
          class="h-[300px] w-full rounded-lg object-cover shadow-sm lg:h-full lg:max-h-[700px] lg:w-[590px]"
        />
      </div>
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
      description: `Measure what matters with ${COMPANY_NAME}easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
      link: { text: "Learn more", url: "#" },
    },
    {
      icon: "heroicons:users",
      title: "Connect with customers",
      description:
        "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
      link: { text: "Learn more", url: "#" },
    },
  ];
</script>
