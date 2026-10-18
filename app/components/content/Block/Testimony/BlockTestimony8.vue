<template>
  <!--
    Customer story with outcome stats
    Features: Portrait beside a large quote, the company wordmark, three outcome stats and a link to the full story
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="bg-card grid overflow-hidden rounded-3xl border lg:grid-cols-[2fr_3fr]">
      <div class="relative min-h-72">
        <img
          :src="item.avatar.replace('/120?', '/800?')"
          :alt="item.name"
          class="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="flex flex-col justify-center p-8 sm:p-12">
        <p class="text-muted-foreground flex items-center gap-2 text-xl font-semibold">
          <Icon name="lucide:compass" class="size-6" />
          {{ item.company }}
        </p>
        <blockquote class="mt-6 text-2xl leading-snug font-medium text-balance sm:text-3xl">
          “{{ item.quote }}”
        </blockquote>
        <figcaption class="mt-6">
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-muted-foreground text-sm">{{ item.role }}, {{ item.company }}</p>
        </figcaption>
        <dl class="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
          <div v-for="stat in props.stats" :key="stat.label" class="flex flex-col-reverse gap-1">
            <dt class="text-muted-foreground text-xs sm:text-sm">{{ stat.label }}</dt>
            <dd class="text-primary text-2xl font-bold tracking-tight sm:text-3xl">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
        <UiButton variant="link" class="mt-4 w-fit px-0">
          Read the full story
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </div>
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
      stats?: { value: string; label: string }[];
    }>(),
    {
      title: "",
      description: "",
      stats: () => [
        { value: "42%", label: "Faster planning" },
        { value: "3x", label: "More releases" },
        { value: "-33%", label: "Support tickets" },
      ],
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
