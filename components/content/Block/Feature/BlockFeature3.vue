<template>
  <UiContainer class="grid grid-cols-1 gap-y-10 py-16 md:gap-8 md:py-24 lg:grid-cols-3">
    <div
      v-for="(f, i) in features"
      :key="i"
      class="group flex flex-col items-center justify-center"
    >
      <div class="flex h-12 w-12 items-center justify-center rounded-md border">
        <Icon
          :name="f.icon"
          class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6"
        />
      </div>
      <h3
        class="mt-4 text-balance text-center text-lg font-semibold lg:mt-5 lg:text-xl"
        v-html="f.title"
      />
      <p
        class="mt-1 max-w-[400px] text-balance text-center text-muted-foreground lg:mt-2 lg:max-w-none"
        v-html="f.description"
      />
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
