<template>
  <!--
    Social post style cards
    Features: Cards styled like social posts with an X logo, handle, post text, timestamp and like count, linking out to the original post
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(t, i) in props.items.slice(0, 6)"
        :key="t.name"
        as="li"
        :initial="{ opacity: 0, y: 16 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.4, delay: (i % 3) * 0.08 }"
      >
        <a
          href="#"
          class="bg-card hover:border-primary/40 block h-full rounded-2xl border p-5 transition-colors"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <UiAvatar :src="t.avatar" :fallback="t.name[0]" />
              <div>
                <p class="text-sm leading-tight font-semibold">{{ t.name }}</p>
                <p class="text-muted-foreground text-xs">{{ t.handle }}</p>
              </div>
            </div>
            <Icon name="simple-icons:x" class="text-muted-foreground size-4" />
          </div>
          <p class="mt-4 text-sm leading-relaxed">{{ t.quote }}</p>
          <p class="text-muted-foreground mt-4 flex items-center gap-4 text-xs">
            <span>{{ times[i] }}</span>
            <span class="flex items-center gap-1">
              <Icon name="lucide:heart" class="size-3.5" />
              {{ likes[i] }}
            </span>
          </p>
        </a>
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
      title: "Loved on social",
      description: "People are talking, and we are listening.",
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

  const times = [
    "2:14 PM · Jan 8",
    "9:41 AM · Jan 6",
    "6:02 PM · Jan 3",
    "11:30 AM · Dec 28",
    "8:15 PM · Dec 21",
    "1:47 PM · Dec 14",
  ];
  const likes = ["1.2K", "864", "2.4K", "431", "978", "1.6K"];
</script>
