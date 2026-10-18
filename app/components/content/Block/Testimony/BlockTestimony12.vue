<template>
  <!--
    Compact quote banner
    Features: Slim full width banner with a short quote, avatar, name and a story link, built to sit between sections
  -->
  <UiContainer class="py-10">
    <Motion
      :initial="{ opacity: 0, y: 12 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ duration: 0.45 }"
      class="bg-muted/50 flex flex-col items-start gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
    >
      <UiAvatar :src="item.avatar" :fallback="item.name[0]" class="size-14 shrink-0" />
      <div class="flex-1">
        <blockquote class="text-lg leading-snug font-medium text-balance">
          “{{ item.quote }}”
        </blockquote>
        <p class="text-muted-foreground mt-2 text-sm">
          <span class="text-foreground font-semibold">{{ item.name }}</span>
          · {{ item.role }}, {{ item.company }}
        </p>
      </div>
      <UiButton variant="outline" class="shrink-0">
        Read story
        <Icon name="lucide:arrow-right" class="size-4" />
      </UiButton>
    </Motion>
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
      title: "",
      description: "",
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

  const item = computed(() => props.items[1]!);
</script>
