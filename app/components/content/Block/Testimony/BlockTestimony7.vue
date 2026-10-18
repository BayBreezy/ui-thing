<template>
  <!--
    Vertical marquee columns
    Features: Three columns of quote cards that scroll in alternating directions with top and bottom fades, pause on hover and stop for reduced motion
  -->
  <section class="overflow-hidden py-16 lg:py-24">
    <UiContainer>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
      </div>
      <div
        class="marquee mt-12 grid h-[36rem] gap-5 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(col, c) in columns"
          :key="c"
          class="min-h-0"
          :class="c === 2 ? 'hidden lg:block' : c === 1 ? 'hidden md:block' : ''"
        >
          <ul class="marquee-track space-y-5" :class="c === 1 ? 'marquee-reverse' : ''">
            <li
              v-for="(t, i) in [...col, ...col, ...col, ...col]"
              :key="`${t.name}-${i}`"
              class="bg-card rounded-2xl border p-6"
              :aria-hidden="i >= col.length"
            >
              <blockquote class="leading-relaxed">“{{ t.quote }}”</blockquote>
              <figcaption class="mt-4 flex items-center gap-3">
                <UiAvatar :src="t.avatar" :fallback="t.name[0]" class="size-9" />
                <div>
                  <p class="text-sm font-semibold">{{ t.name }}</p>
                  <p class="text-muted-foreground text-xs">{{ t.role }}, {{ t.company }}</p>
                </div>
              </figcaption>
            </li>
          </ul>
        </div>
      </div>
    </UiContainer>
  </section>
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
      title: "Loved by people who ship",
      description: "Scroll through what customers are saying.",
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

  const columns = computed(() => [
    props.items.filter((_, i) => i % 3 === 0),
    props.items.filter((_, i) => i % 3 === 1),
    props.items.filter((_, i) => i % 3 === 2),
  ]);
</script>

<style scoped>
  .marquee-track {
    animation: marquee-up 50s linear infinite;
  }
  .marquee-reverse {
    animation-direction: reverse;
  }
  .marquee:hover .marquee-track {
    animation-play-state: paused;
  }
  @keyframes marquee-up {
    to {
      transform: translateY(-25%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
    }
  }
</style>
