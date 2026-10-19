<template>
  <!--
    Case study cards
    Features: Featured wide card plus supporting cards, headline result metric, client name, industry tags, read case study link with arrow
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold lg:text-4xl">Results our customers see</h2>
        <p class="text-muted-foreground mt-3 text-lg">
          Real teams, real numbers. Read how they got there.
        </p>
      </div>

      <ul class="mt-10 grid gap-6 md:grid-cols-2">
        <li
          v-for="(study, index) in studies"
          :key="study.client"
          :class="index === 0 ? 'md:col-span-2' : ''"
        >
          <UiCard
            class="group h-full gap-0 overflow-hidden py-0"
            :class="index === 0 ? 'md:grid md:grid-cols-2' : ''"
          >
            <div class="overflow-hidden">
              <img
                :src="study.image"
                :alt="study.alt"
                class="h-full max-h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none md:max-h-none"
                :class="index === 0 ? 'aspect-16/10 md:aspect-auto' : 'aspect-16/10'"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col gap-4 p-6" :class="index === 0 ? 'md:p-8' : ''">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-semibold">{{ study.client }}</p>
                <ul class="flex flex-wrap justify-end gap-1.5">
                  <li v-for="tag in study.tags" :key="tag">
                    <UiBadge variant="secondary" size="sm">{{ tag }}</UiBadge>
                  </li>
                </ul>
              </div>
              <div>
                <p class="text-primary text-4xl font-bold tracking-tight tabular-nums">
                  {{ study.metric }}
                </p>
                <p class="text-muted-foreground text-sm">{{ study.metricLabel }}</p>
              </div>
              <h3 class="leading-snug font-semibold" :class="index === 0 ? 'text-xl' : 'text-lg'">
                {{ study.title }}
              </h3>
              <p class="text-muted-foreground text-sm">{{ study.summary }}</p>
              <UiButton variant="link" class="mt-auto h-auto self-start p-0">
                Read case study
                <Icon
                  name="lucide:arrow-right"
                  class="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </UiButton>
            </div>
          </UiCard>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Study = {
    client: string;
    title: string;
    summary: string;
    metric: string;
    metricLabel: string;
    image: string;
    alt: string;
    tags: string[];
  };

  withDefaults(
    defineProps<{
      studies?: Study[];
    }>(),
    {
      studies: () => [
        {
          client: "Fernwood",
          title: "How Fernwood cut planning time from a day to an hour",
          summary:
            "A 40 person product team replaced three spreadsheets and two weekly meetings with a single shared board.",
          metric: "-87%",
          metricLabel: "time spent on planning",
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
          alt: "Team collaborating around a table with laptops",
          tags: ["SaaS", "Product"],
        },
        {
          client: "Tilework",
          title: "Tilework doubled trial signups in one quarter",
          summary:
            "A cleaner onboarding flow and clearer pricing turned curious visitors into users.",
          metric: "+212%",
          metricLabel: "trial signups",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
          alt: "Glass walled office corridor",
          tags: ["Growth"],
        },
        {
          client: "Paperboat",
          title: "Paperboat cut support tickets by a third",
          summary: "Better in-app guidance answered common questions before anyone had to ask.",
          metric: "-34%",
          metricLabel: "support tickets",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
          alt: "Open plan office with large windows",
          tags: ["Support", "Retail"],
        },
      ],
    }
  );
</script>
