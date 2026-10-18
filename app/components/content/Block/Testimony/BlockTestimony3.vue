<template>
  <!--
    Three testimonial cards
    Features: Heading and three quote cards with star ratings, avatars and roles that rise in one after another
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-12 grid gap-6 md:grid-cols-3">
      <Motion
        v-for="(t, i) in props.items.slice(0, 3)"
        :key="t.name"
        as="li"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.45, delay: i * 0.1 }"
      >
        <UiCard class="h-full">
          <UiCardContent class="flex h-full flex-col gap-5">
            <UiRating
              :model-value="5"
              size="sm"
              icon="mdi:star"
              filled-icon-class-name="text-amber-400"
            />
            <blockquote class="flex-1 leading-relaxed">“{{ t.quote }}”</blockquote>
            <figcaption class="flex items-center gap-3">
              <UiAvatar :src="t.avatar" :fallback="t.name[0]" />
              <div>
                <p class="text-sm font-semibold">{{ t.name }}</p>
                <p class="text-muted-foreground text-xs">{{ t.role }}, {{ t.company }}</p>
              </div>
            </figcaption>
          </UiCardContent>
        </UiCard>
      </Motion>
    </ul>
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
    defineProps<{ title?: string; description?: string; items?: Testimonial[] }>(),
    {
      title: "What our customers say",
      description: "Join thousands of teams who trust us every day.",
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
</script>
