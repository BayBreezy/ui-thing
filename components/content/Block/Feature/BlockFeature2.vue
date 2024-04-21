<template>
  <UiContainer class="py-16 lg:py-24">
    <p class="text-center font-semibold text-primary">Features</p>
    <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:text-4xl">
      Beautiful analytics to grow smarter
    </h2>
    <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl">
      Powerful, self-serve product and growth analytics to help you convert, engage, and retain more
      users. Trusted by over 4,000 startups.
    </p>

    <template v-for="(f, i) in features" :key="i">
      <section
        class="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-24 lg:h-[520px] lg:grid-cols-2 lg:gap-20"
      >
        <div :class="[i % 2 == 0 ? 'lg:order-none' : 'lg:order-1']">
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Icon name="heroicons:chat-bubble-left-right" class="h-6 w-6 text-primary" />
          </div>
          <h3 class="mb-2 text-2xl font-semibold lg:mb-4 lg:text-3xl" v-html="f.title" />
          <p class="text-muted-foreground lg:text-lg" v-html="f.description" />

          <div class="mt-8 flex gap-3">
            <template v-for="(l, k) in f.links" :key="`link-${k}`">
              <!-- @vue-expect-error -->
              <UiButton :size="l.size" :external="l.external" :variant="l.variant">
                <Icon v-if="l.icon" :name="l.icon" />
                <span v-html="l.text" />
              </UiButton>
            </template>
          </div>
        </div>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          :src="f.imageUrl"
          :alt="f.title"
          class="h-[300px] w-full rounded-lg object-cover shadow-sm lg:h-[520px]"
        />
      </section>
    </template>
  </UiContainer>
</template>

<script lang="ts" setup>
  const features = [
    {
      title: "Share team inboxes",
      icon: "heroicons:chat-bubble-left-right",
      description:
        "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
      imageUrl:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      links: [
        {
          text: "Demo",
          variant: "outline",
          icon: "lucide:play-circle",
          size: "lg",
          url: "#",
          external: false,
        },
        { text: "Learn more", variant: "default", size: "lg", url: "#", external: false },
      ],
    },
    {
      title: "Deliver instant answers",
      icon: "heroicons:bolt",
      description:
        "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
      imageUrl:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      links: [
        {
          text: "Demo",
          variant: "outline",
          icon: "lucide:play-circle",
          size: "lg",
          url: "#",
          external: false,
        },
        { text: "Learn more", variant: "default", size: "lg", url: "#", external: false },
      ],
    },
    {
      title: "Manage your team with reports",
      icon: "heroicons:cursor-arrow-rays",
      description: `Measure what matters with ${COMPANY_NAME} easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.`,
      imageUrl:
        "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      links: [
        {
          text: "Demo",
          variant: "outline",
          icon: "lucide:play-circle",
          size: "lg",
          url: "#",
          external: false,
        },
        { text: "Learn more", variant: "default", size: "lg", url: "#", external: false },
      ],
    },
  ];
</script>
