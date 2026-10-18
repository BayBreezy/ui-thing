<template>
  <!--
    Testimonial slider with arrows and dots
    Features: One quote at a time with previous and next buttons, dot pagination, keyboard friendly controls and an animated slide between quotes
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <div class="relative min-h-72 sm:min-h-60" aria-live="polite">
        <AnimatePresence mode="wait">
          <Motion
            :key="index"
            :initial="{ opacity: 0, x: direction * 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: direction * -40 }"
            :transition="{ duration: 0.25 }"
          >
            <div class="flex justify-center">
              <UiRating
                :model-value="5"
                size="sm"
                icon="mdi:star"
                filled-icon-class-name="text-amber-400"
              />
            </div>
            <blockquote class="mt-6 text-2xl leading-snug font-medium text-balance sm:text-3xl">
              “{{ current.quote }}”
            </blockquote>
            <figcaption class="mt-6 flex items-center justify-center gap-3">
              <UiAvatar :src="current.avatar" :fallback="current.name[0]" class="size-12" />
              <div class="text-left">
                <p class="font-semibold">{{ current.name }}</p>
                <p class="text-muted-foreground text-sm">
                  {{ current.role }}, {{ current.company }}
                </p>
              </div>
            </figcaption>
          </Motion>
        </AnimatePresence>
      </div>
      <div class="mt-8 flex items-center justify-center gap-4">
        <UiButton variant="outline" size="icon" aria-label="Previous testimonial" @click="go(-1)">
          <Icon name="lucide:arrow-left" class="size-4" />
        </UiButton>
        <div class="flex gap-2">
          <button
            v-for="(it, i) in slides"
            :key="it.name"
            type="button"
            class="h-2 rounded-full transition-all"
            :class="i === index ? 'bg-primary w-6' : 'bg-muted-foreground/30 w-2'"
            :aria-label="`Show testimonial ${i + 1}`"
            :aria-current="i === index"
            @click="jump(i)"
          />
        </div>
        <UiButton variant="outline" size="icon" aria-label="Next testimonial" @click="go(1)">
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

  const slides = computed(() => props.items.slice(0, 5));
  const index = ref(0);
  const direction = ref(1);
  const current = computed(() => slides.value[index.value]!);

  function go(step: number) {
    direction.value = step;
    index.value = (index.value + step + slides.value.length) % slides.value.length;
  }
  function jump(i: number) {
    direction.value = i > index.value ? 1 : -1;
    index.value = i;
  }
</script>
