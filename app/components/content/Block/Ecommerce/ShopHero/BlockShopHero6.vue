<template>
  <!--
    Shop hero slider that rotates on its own
    Features: Embla carousel with three tinted promo slides, rotates every few seconds, pauses on hover, focus or with a play pause button, respects reduced motion, arrows and dot navigation
  -->
  <UiContainer class="py-16 lg:py-24">
    <div
      role="group"
      aria-label="Featured promotions"
      class="relative"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
      @focusin="focused = true"
      @focusout="focused = false"
    >
      <UiCarousel :opts="{ loop: true }" class="overflow-hidden rounded-3xl" @init-api="onInit">
        <UiCarouselContent>
          <UiCarouselItem
            v-for="(slide, i) in slides"
            :key="slide.title"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${i + 1} of ${slides.length}`"
          >
            <div class="grid min-h-[480px] md:grid-cols-2" :class="slide.tone">
              <div class="flex flex-col justify-center gap-5 p-8 sm:p-12 lg:p-16">
                <p class="text-sm font-semibold tracking-wide uppercase opacity-70">
                  {{ slide.eyebrow }}
                </p>
                <h2 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                  {{ slide.title }}
                </h2>
                <p class="max-w-md text-lg opacity-80">{{ slide.description }}</p>
                <div>
                  <UiButton size="lg" as="a" :href="slide.href">
                    {{ slide.cta }}
                    <Icon name="lucide:arrow-right" />
                  </UiButton>
                </div>
              </div>
              <div class="relative min-h-64">
                <img
                  :src="slide.image"
                  :alt="slide.imageAlt"
                  class="absolute inset-0 size-full object-cover"
                  draggable="false"
                />
              </div>
            </div>
          </UiCarouselItem>
        </UiCarouselContent>
      </UiCarousel>

      <div class="mt-5 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2" role="group" aria-label="Choose a slide">
          <button
            v-for="(slide, i) in slides"
            :key="slide.title"
            type="button"
            class="focus-visible:ring-ring h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            :class="i === index ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'"
            :aria-label="`Go to slide ${i + 1}`"
            :aria-current="i === index"
            @click="api?.scrollTo(i)"
          />
        </div>
        <div class="flex items-center gap-2">
          <UiButton
            variant="outline"
            size="icon-sm"
            class="rounded-full"
            :aria-label="playing ? 'Pause slideshow' : 'Play slideshow'"
            @click="playing = !playing"
          >
            <Icon :name="playing ? 'lucide:pause' : 'lucide:play'" />
          </UiButton>
          <UiButton
            variant="outline"
            size="icon-sm"
            class="rounded-full"
            aria-label="Previous slide"
            @click="api?.scrollPrev()"
          >
            <Icon name="lucide:arrow-left" />
          </UiButton>
          <UiButton
            variant="outline"
            size="icon-sm"
            class="rounded-full"
            aria-label="Next slide"
            @click="api?.scrollNext()"
          >
            <Icon name="lucide:arrow-right" />
          </UiButton>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Slide = {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    href: string;
    image: string;
    imageAlt: string;
    tone: string;
  };

  type EmblaLike = {
    scrollNext: () => void;
    scrollPrev: () => void;
    scrollTo: (index: number) => void;
    selectedScrollSnap: () => number;
    on: (event: "select", callback: () => void) => void;
  };

  const props = withDefaults(
    defineProps<{
      slides?: Slide[];
      /** Milliseconds between automatic slide changes. */
      interval?: number;
    }>(),
    {
      interval: 5000,
      slides: () => [
        {
          eyebrow: "New season",
          title: "Layers for the first cold mornings.",
          description: "Bomber jackets, knits and everyday outerwear, restocked this week.",
          cta: "Shop outerwear",
          href: "#",
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Rust bomber jacket on a hanger",
          tone: "bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50",
        },
        {
          eyebrow: "Listen closer",
          title: "Studio sound without the studio price.",
          description: "Our best selling over-ear headphones are now $50 off for a limited time.",
          cta: "Shop audio",
          href: "#",
          image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Black over-ear headphones",
          tone: "bg-sky-50 text-sky-950 dark:bg-sky-950/40 dark:text-sky-50",
        },
        {
          eyebrow: "Slow evenings",
          title: "Make the house smell like autumn.",
          description: "Hand poured soy candles and stoneware, gift wrapped for free.",
          cta: "Shop for home",
          href: "#",
          image:
            "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Soy candle burning in a glass jar",
          tone: "bg-rose-50 text-rose-950 dark:bg-rose-950/40 dark:text-rose-50",
        },
      ],
    }
  );

  const api = shallowRef<EmblaLike>();
  const index = ref(0);
  const playing = ref(true);
  const hovering = ref(false);
  const focused = ref(false);
  const reducedMotion = usePreferredReducedMotion();

  function onInit(embla: EmblaLike) {
    api.value = embla;
    index.value = embla.selectedScrollSnap();
    embla.on("select", () => (index.value = embla.selectedScrollSnap()));
  }

  const running = computed(
    () => playing.value && !hovering.value && !focused.value && reducedMotion.value !== "reduce"
  );

  const { pause, resume } = useIntervalFn(() => api.value?.scrollNext(), props.interval, {
    immediate: false,
  });
  watch(running, (value) => (value ? resume() : pause()), { immediate: true });
</script>
