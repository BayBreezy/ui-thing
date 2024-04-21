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

    <!-- eslint-disable-next-line vue/html-self-closing -->
    <img
      src="https://images.unsplash.com/photo-1608411404720-c8f0417bcdba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Cutting edge feature"
      width="700"
      height="600"
      class="mx-auto mt-12 h-[300px] w-full rounded-lg object-cover shadow-sm drop-shadow-md lg:mt-16 lg:h-[520px] lg:w-[770px]"
    />

    <div class="my-12 grid grid-cols-1 gap-y-10 lg:my-24 lg:grid-cols-3 lg:gap-8 lg:gap-y-16">
      <template v-for="(f, i) in features" :key="i">
        <div class="group flex flex-col items-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-md border">
            <Icon
              :name="f.icon"
              class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
            />
          </div>
          <h3 class="mt-4 text-center text-lg font-semibold lg:mt-5 lg:text-xl" v-text="f.title" />
          <p
            class="mt-1 max-w-[500px] text-balance text-center text-muted-foreground lg:mt-2"
            v-text="f.description"
          />
          <NuxtLink
            class="mt-4 inline-block font-semibold text-primary underline-offset-2 hover:underline lg:mt-5"
            :to="f.link.url"
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
