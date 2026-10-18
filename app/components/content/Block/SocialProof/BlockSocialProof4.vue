<template>
  <!--
    Testimonial cards with a rating summary and logo strip
    Features: Overall rating with review count, three quote cards with stars, avatars and roles, and a muted row of customer wordmarks underneath
  -->
  <section class="bg-muted/40 py-16 lg:py-24">
    <UiContainer>
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-primary text-sm font-semibold tracking-wide uppercase">Testimonials</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <div class="mt-4 flex items-center justify-center gap-2 text-sm">
          <UiRating
            :model-value="props.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="font-semibold">{{ props.rating }} out of 5</span>
          <span class="text-muted-foreground">({{ props.reviews }} reviews)</span>
        </div>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <Motion
          v-for="(quote, i) in props.quotes"
          :key="quote.name"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.5, delay: i * 0.1 }"
        >
          <UiCard class="h-full">
            <UiCardContent class="flex h-full flex-col gap-5">
              <UiRating
                :model-value="5"
                size="sm"
                icon="mdi:star"
                filled-icon-class-name="text-amber-400"
              />
              <blockquote class="flex-1 leading-relaxed">“{{ quote.text }}”</blockquote>
              <div class="flex items-center gap-3">
                <UiAvatar :src="quote.avatar" :fallback="quote.name[0]" />
                <div>
                  <p class="text-sm font-semibold">{{ quote.name }}</p>
                  <p class="text-muted-foreground text-xs">{{ quote.role }}</p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>
      </div>

      <div class="mt-14">
        <p class="text-muted-foreground text-center text-sm">Trusted by leading teams worldwide</p>
        <ul class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <li
            v-for="logo in props.logos"
            :key="logo.name"
            class="text-muted-foreground/70 flex items-center gap-2 text-lg font-semibold"
          >
            <Icon :name="logo.icon" class="size-5" />
            {{ logo.name }}
          </li>
        </ul>
      </div>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };
  type Quote = { text: string; name: string; role: string; avatar: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      rating?: number;
      reviews?: string;
      quotes?: Quote[];
      logos?: Logo[];
    }>(),
    {
      title: "What our customers say",
      rating: 4.9,
      reviews: "2,458",
      quotes: () => [
        {
          text: "It changed how our whole team works. Everything is where we expect it to be and nothing gets lost.",
          name: "Sarah Johnson",
          role: "CEO at Northwind",
          avatar: "https://i.pravatar.cc/80?img=47",
        },
        {
          text: "Best investment we made this year. Planning time is down by 40% and our releases are calmer.",
          name: "Michael Chen",
          role: "CTO at Vertex",
          avatar: "https://i.pravatar.cc/80?img=12",
        },
        {
          text: "Outstanding support and constant improvements. They clearly care about the people using it.",
          name: "Emily Rodriguez",
          role: "Head of Product at Lumen",
          avatar: "https://i.pravatar.cc/80?img=32",
        },
      ],
      logos: () => [
        { name: "Acme", icon: "lucide:hexagon" },
        { name: "Orbit", icon: "lucide:orbit" },
        { name: "Pulse", icon: "lucide:activity" },
        { name: "Nimbus", icon: "lucide:cloud" },
        { name: "Quanta", icon: "lucide:atom" },
      ],
    }
  );
</script>
