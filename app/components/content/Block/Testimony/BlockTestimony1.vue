<template>
  <!--
    Single centered quote
    Features: Large centered quote with a star rating, avatar, name and role that fades in on scroll
  -->
  <UiContainer class="py-16 lg:py-24">
    <Motion
      :initial="{ opacity: 0, y: 16 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ duration: 0.5 }"
      class="mx-auto max-w-3xl text-center"
    >
      <div class="flex justify-center">
        <UiRating
          :model-value="5"
          size="sm"
          icon="mdi:star"
          filled-icon-class-name="text-amber-400"
        />
      </div>
      <blockquote
        class="mt-6 text-2xl leading-snug font-medium text-balance sm:text-3xl lg:text-4xl"
      >
        “{{ item.quote }}”
      </blockquote>
      <figcaption class="mt-8 flex flex-col items-center gap-3">
        <UiAvatar :src="item.avatar" :fallback="item.name[0]" class="size-14" />
        <div>
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-muted-foreground text-sm">{{ item.role }}, {{ item.company }}</p>
        </div>
      </figcaption>
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

  const item = computed(() => props.items[0]!);
</script>
