<template>
  <!-- 
    Journey Map About Section
    Features: Interactive company journey visualization
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Our Journey</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        From humble beginnings to industry leaders
      </p>
    </div>

    <div class="relative mt-12">
      <!-- Connecting Line -->
      <div
        class="from-border via-border absolute top-8 left-4 hidden h-full w-0.5 bg-linear-to-b to-transparent md:left-1/2 md:block"
      />

      <div class="space-y-12">
        <div v-for="(milestone, index) in milestones" :key="milestone.year" class="relative">
          <div class="flex items-start gap-4 md:grid md:grid-cols-2 md:gap-8">
            <!-- Left Side (odd items on mobile, even items on desktop) -->
            <div :class="index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'">
              <UiCard class="md:mx-4">
                <UiCardContent>
                  <UiBadge class="mb-3">{{ milestone.year }}</UiBadge>
                  <h3 class="text-xl font-bold">{{ milestone.title }}</h3>
                  <p class="text-muted-foreground mt-2 text-sm">{{ milestone.description }}</p>
                  <div
                    class="mt-4 flex flex-wrap gap-2"
                    :class="index % 2 === 0 ? 'md:justify-end' : ''"
                  >
                    <UiBadge
                      v-for="tag in milestone.tags"
                      :key="tag"
                      variant="outline"
                      class="text-xs"
                    >
                      {{ tag }}
                    </UiBadge>
                  </div>
                </UiCardContent>
              </UiCard>
            </div>

            <!-- Center Dot -->
            <div
              class="border-background bg-primary from-primary via-background to-background absolute left-4 hidden size-10 -translate-x-1/2 items-center justify-center rounded-full border-4 md:left-1/2 md:flex dark:bg-linear-to-b"
            >
              <Icon
                :name="milestone.icon"
                class="text-primary-foreground dark:text-primary size-4"
              />
            </div>
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
      title: "The Beginning",
      description:
        "Founded in a small garage with a vision to revolutionize the industry. Started with just 3 passionate individuals.",
      icon: "lucide:rocket",
      tags: ["Startup", "Vision"],
    },
    {
      year: "2017",
      title: "First Major Product Launch",
      description:
        "Released our flagship product to critical acclaim. Secured Series A funding of $5M and grew team to 15 members.",
      icon: "lucide:package",
      tags: ["Product", "Growth"],
    },
    {
      year: "2019",
      title: "Global Expansion",
      description:
        "Opened offices in London and Singapore. Reached 1,000+ customers across 25 countries.",
      icon: "lucide:globe",
      tags: ["International", "Scale"],
    },
    {
      year: "2021",
      title: "Innovation Award",
      description:
        "Recognized as 'Most Innovative Company' by Tech Magazine. Launched AI-powered features that changed the game.",
      icon: "lucide:trophy",
      tags: ["Recognition", "Innovation"],
    },
    {
      year: "2023",
      title: "Unicorn Status",
      description:
        "Reached $1B valuation with Series C funding. Team grew to 500+ across 10 global offices.",
      icon: "lucide:trending-up",
      tags: ["Milestone", "Investment"],
    },
    {
      year: "2025",
      title: "The Future",
      description:
        "Continuing to innovate and push boundaries. Committed to sustainability and making a positive global impact.",
      icon: "lucide:sparkles",
      tags: ["Vision", "Sustainability"],
    },
  ];
</script>
