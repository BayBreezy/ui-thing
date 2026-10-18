<template>
  <!--
    Scroll snap testimonial carousel
    Features: Horizontal scroll snap row of quote cards with previous and next buttons that scroll by one card, disabled at the ends, swipeable on touch
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div class="max-w-xl">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-3 text-lg">{{ props.description }}</p>
      </div>
      <div class="flex gap-2">
        <UiButton
          variant="outline"
          size="icon"
          aria-label="Scroll left"
          :disabled="atStart"
          @click="scroll(-1)"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
        </UiButton>
        <UiButton
          variant="outline"
          size="icon"
          aria-label="Scroll right"
          :disabled="atEnd"
          @click="scroll(1)"
        >
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </div>
    </div>
    <ul
      ref="track"
      class="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-5 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden"
      @scroll.passive="update"
    >
      <li
        v-for="t in props.items"
        :key="t.name"
        class="bg-card w-[85%] shrink-0 snap-start rounded-2xl border p-6 sm:w-96"
      >
        <UiRating
          :model-value="5"
          size="sm"
          icon="mdi:star"
          filled-icon-class-name="text-amber-400"
        />
        <blockquote class="mt-4 leading-relaxed">“{{ t.quote }}”</blockquote>
        <figcaption class="mt-5 flex items-center gap-3">
          <UiAvatar :src="t.avatar" :fallback="t.name[0]" />
          <div>
            <p class="text-sm font-semibold">{{ t.name }}</p>
            <p class="text-muted-foreground text-xs">{{ t.role }}, {{ t.company }}</p>
          </div>
        </figcaption>
      </li>
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
      title: "Hear it from our customers",
      description: "Swipe or use the arrows to read more.",
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

  const track = ref<HTMLElement | null>(null);
  const atStart = ref(true);
  const atEnd = ref(false);

  function update() {
    const el = track.value;
    if (!el) return;
    atStart.value = el.scrollLeft <= 4;
    atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
  }
  function scroll(dir: number) {
    const el = track.value;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 20), behavior: "smooth" });
  }
  onMounted(update);
</script>
