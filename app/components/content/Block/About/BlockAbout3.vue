<template>
  <!-- 
    Story Timeline About Section
    Features: Timeline layout with company milestones
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Our Journey</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        From humble beginnings to industry leader
      </p>
    </div>

    <div class="mx-auto mt-12 max-w-3xl">
      <div class="relative pl-8">
        <div v-for="milestone in milestones" :key="milestone.year" class="relative pb-8 last:pb-0">
          <div class="absolute top-0 -left-[35px] flex h-full items-center justify-center">
            <div
              class="via-border h-full w-0.5 rounded-full bg-linear-to-b from-transparent to-transparent"
            />
          </div>
          <div
            class="border-background bg-primary absolute -left-[53px] flex size-10 items-center justify-center rounded-full border-4"
          >
            <Icon :name="milestone.icon" class="text-primary-foreground size-4" />
          </div>
          <div class="pt-2">
            <UiBadge variant="outline" class="mb-2">{{ milestone.year }}</UiBadge>
            <h3 class="text-xl font-semibold">{{ milestone.title }}</h3>
            <p class="text-muted-foreground mt-2 max-w-3xl text-pretty">
              {{ milestone.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description:
        "Started with a vision to revolutionize the industry with three passionate co-founders in a small garage.",
      icon: "lucide:rocket",
    },
    {
      year: "2017",
      title: "First Major Product Launch",
      description:
        "Released our flagship product that changed how businesses operate, gaining 1,000+ customers in the first month.",
      icon: "lucide:package",
    },
    {
      year: "2019",
      title: "Series A Funding",
      description:
        "Secured $10M in funding to expand our team and accelerate product development across new markets.",
      icon: "lucide:trending-up",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description:
        "Opened offices in 5 countries and grew our team to over 200 employees worldwide.",
      icon: "lucide:globe",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description:
        "Named 'Best Innovation' by Tech Leaders Magazine and reached 100,000 active users globally.",
      icon: "lucide:award",
    },
    {
      year: "2025",
      title: "The Future",
      description:
        "Continuing to innovate and push boundaries with AI-powered solutions and sustainable practices.",
      icon: "lucide:sparkles",
    },
  ];
</script>
