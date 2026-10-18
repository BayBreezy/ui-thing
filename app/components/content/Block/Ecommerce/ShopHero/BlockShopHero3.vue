<template>
  <!--
    Full bleed shop hero with image overlay
    Features: Edge to edge photo with a dark gradient scrim, left aligned headline and calls to action, a small promo ribbon and scroll cue, text stays readable on any photo
  -->
  <section
    class="relative isolate flex min-h-[560px] items-center overflow-hidden lg:min-h-[680px]"
  >
    <img
      :src="image"
      :alt="imageAlt"
      class="absolute inset-0 -z-20 size-full object-cover object-[center_45%]"
    />
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/10"
      aria-hidden="true"
    />

    <UiContainer class="py-20">
      <Motion
        class="max-w-xl text-white"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <p
          class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide uppercase backdrop-blur"
        >
          <Icon name="lucide:gift" class="size-3.5" />
          {{ ribbon }}
        </p>
        <h1 class="mt-6 text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          {{ title }}
        </h1>
        <p class="mt-6 max-w-md text-lg text-white/80">{{ description }}</p>
        <div class="mt-10 flex flex-wrap gap-3">
          <UiButton size="lg" class="bg-white text-black hover:bg-white/90">
            Shop for the home
          </UiButton>
          <UiButton
            size="lg"
            variant="outline"
            class="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            View lookbook
          </UiButton>
        </div>
      </Motion>
    </UiContainer>

    <a
      href="#"
      class="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 transition hover:text-white sm:block"
      aria-label="Scroll to products"
    >
      <Icon name="lucide:chevrons-down" class="size-6 animate-bounce" />
    </a>
  </section>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      ribbon?: string;
      title?: string;
      description?: string;
      image?: string;
      imageAlt?: string;
    }>(),
    {
      ribbon: "Free gift wrap this week",
      title: "Make the house feel like autumn.",
      description:
        "Hand poured soy candles, stoneware and soft throws for slower evenings. Small batches, natural wax and free gift wrapping on every order.",
      image:
        "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=2000&q=80",
      imageAlt: "Soy candle burning in a glass jar beside a small plant",
    }
  );
</script>
