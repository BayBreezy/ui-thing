<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-[760px]">
      <div class="text-center">
        <UiBadge variant="outline" class="gap-2 px-3 py-1.5 text-sm font-normal"
          ><Icon name="lucide:circle-dot" class="h-4 w-4 text-primary" /> Features</UiBadge
        >
      </div>
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:mt-7 lg:text-4xl">
        Cutting-edge features for advanced analytics
      </h2>
      <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl">
        Powerful, self-serve product and growth analytics to help you convert, engage, and retain
        more users. Trusted by over 4,000 startups.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-y-12 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 lg:py-20">
      <div class="flex flex-col gap-10 lg:gap-12">
        <template v-for="(f, i) in features1" :key="i">
          <div class="group flex flex-col">
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-balance text-lg font-semibold lg:mt-5 lg:text-xl"
              v-text="f.title"
            />
            <p class="mt-1 text-balance text-muted-foreground lg:mt-2" v-text="f.description" />
            <NuxtLink
              class="mt-4 inline-block font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
              :to="f.link.url"
              >{{ f.link.text }} <Icon name="heroicons:arrow-right" class="h-4 w-4"
            /></NuxtLink>
          </div>
        </template>
      </div>
      <div class="order-last col-span-full lg:order-none lg:col-span-1">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="/phone-mockup.png"
          alt="Features section nine image"
          class="mx-auto h-[360px] w-[400px] object-cover object-top lg:h-[640px] lg:w-full lg:object-contain"
        />
      </div>
      <div class="flex flex-col gap-10 lg:gap-12">
        <template v-for="(f, i) in features2" :key="i">
          <div class="group flex flex-col">
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon
                :name="f.icon"
                class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
              />
            </div>
            <h3
              class="mt-4 text-balance text-lg font-semibold lg:mt-5 lg:text-xl"
              v-text="f.title"
            />
            <p class="mt-1 text-balance text-muted-foreground lg:mt-2" v-text="f.description" />
            <NuxtLink
              class="mt-4 inline-block font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
              :to="f.link.url"
              >{{ f.link.text }} <Icon name="heroicons:arrow-right" class="h-4 w-4"
            /></NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const features1 = [
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
  ];
  const features2 = [
    {
      icon: "heroicons:cursor-arrow-rays",
      title: "Manage your team with reports",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
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
