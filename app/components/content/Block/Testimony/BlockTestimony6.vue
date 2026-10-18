<template>
  <!--
    Rating summary with review list
    Features: Overall rating with a star breakdown and animated bars beside a list of written reviews with stars and avatars
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-3">{{ props.description }}</p>
        <div class="mt-8 flex items-end gap-3">
          <p class="text-6xl font-bold tracking-tight">{{ props.rating }}</p>
          <div class="pb-2">
            <UiRating
              :model-value="props.rating"
              icon="mdi:star"
              filled-icon-class-name="text-amber-400"
            />
            <p class="text-muted-foreground mt-1 text-sm">Based on {{ props.reviews }} reviews</p>
          </div>
        </div>
        <ul class="mt-6 space-y-2.5">
          <li v-for="row in breakdown" :key="row.stars" class="flex items-center gap-3 text-sm">
            <span class="w-8 shrink-0">{{ row.stars }} ★</span>
            <div class="bg-muted h-2 flex-1 overflow-hidden rounded-full">
              <Motion
                :initial="{ width: 0 }"
                :while-in-view="{ width: `${row.percent}%` }"
                :in-view-options="{ once: true }"
                :transition="{ duration: 0.8 }"
                class="h-full rounded-full bg-amber-400"
              />
            </div>
            <span class="text-muted-foreground w-9 text-right">{{ row.percent }}%</span>
          </li>
        </ul>
      </div>
      <ul class="divide-y">
        <li v-for="t in props.items.slice(0, 4)" :key="t.name" class="py-6 first:pt-0">
          <div class="flex items-center gap-3">
            <UiAvatar :src="t.avatar" :fallback="t.name[0]" />
            <div>
              <p class="text-sm font-semibold">{{ t.name }}</p>
              <p class="text-muted-foreground text-xs">{{ t.role }}, {{ t.company }}</p>
            </div>
            <div class="ml-auto">
              <UiRating
                :model-value="5"
                size="sm"
                icon="mdi:star"
                filled-icon-class-name="text-amber-400"
              />
            </div>
          </div>
          <p class="text-muted-foreground mt-3 leading-relaxed">{{ t.quote }}</p>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Testimonial = {
    quote: string;
    name: string;
    role: string;
    company: string;
    handle: string;
    avatar: string;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      items?: Testimonial[];
      rating?: number;
      reviews?: string;
    }>(),
    {
      title: "Rated 4.9 by our customers",
      description: "Honest feedback from teams of every size.",
      rating: 4.9,
      reviews: "2,458",
      items: () => [
        {
          quote:
            "We replaced three tools with one and our planning meetings got shorter overnight. The team actually enjoys opening it.",
          name: "Sarah Johnson",
          role: "CEO",
          company: "Northwind",
          handle: "@sarahj",
          avatar: "https://i.pravatar.cc/120?img=47",
        },
        {
          quote:
            "Onboarding a new engineer used to take two weeks. With the shared workspace it takes an afternoon.",
          name: "Michael Chen",
          role: "CTO",
          company: "Vertex",
          handle: "@mchen",
          avatar: "https://i.pravatar.cc/120?img=12",
        },
        {
          quote:
            "Support volume dropped by a third in the first quarter because customers finally find answers on their own.",
          name: "Emily Rodriguez",
          role: "Head of Support",
          company: "Lumen",
          handle: "@emilyrod",
          avatar: "https://i.pravatar.cc/120?img=32",
        },
        {
          quote:
            "The best investment we made this year. Our releases are calmer and nobody dreads Mondays anymore.",
          name: "Priya Nair",
          role: "VP of Engineering",
          company: "Orbit",
          handle: "@priya_n",
          avatar: "https://i.pravatar.cc/120?img=45",
        },
        {
          quote:
            "Simple, powerful and reliable. Exactly what we needed for a team that grew from five to fifty.",
          name: "Noah Fischer",
          role: "Founder",
          company: "Pulse",
          handle: "@noahf",
          avatar: "https://i.pravatar.cc/120?img=53",
        },
        {
          quote:
            "Outstanding support. I asked for a small change on Tuesday and it shipped on Wednesday.",
          name: "Ana Souza",
          role: "Operations Lead",
          company: "Nimbus",
          handle: "@anasouza",
          avatar: "https://i.pravatar.cc/120?img=44",
        },
        {
          quote:
            "Every detail feels considered. It is rare to find software that is this fast and this friendly.",
          name: "Hannah Lee",
          role: "Product Manager",
          company: "Quanta",
          handle: "@hannahlee",
          avatar: "https://i.pravatar.cc/120?img=49",
        },
        {
          quote:
            "We evaluated six alternatives. Nothing else came close on price, polish or the people behind it.",
          name: "Diego Alvarez",
          role: "Director of IT",
          company: "Summit",
          handle: "@diegoa",
          avatar: "https://i.pravatar.cc/120?img=33",
        },
      ],
    }
  );

  const breakdown = [
    { stars: 5, percent: 88 },
    { stars: 4, percent: 9 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ];
</script>
