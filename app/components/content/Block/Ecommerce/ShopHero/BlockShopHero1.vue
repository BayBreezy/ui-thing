<template>
  <!--
    Shop hero with a product photo collage
    Features: Headline and calls to action on the left, three staggered product photos on the right with a floating customer rating card, and a row of shipping, returns and warranty perks
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <UiBadge variant="secondary" size="md" class="gap-1.5">
          <Icon name="lucide:sparkles" />
          {{ eyebrow }}
        </UiBadge>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ title }}
        </h1>
        <p class="text-muted-foreground mt-6 max-w-lg text-lg">{{ description }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UiButton size="lg">
            Shop the collection
            <Icon name="lucide:arrow-right" />
          </UiButton>
          <UiButton variant="outline" size="lg">Browse the lookbook</UiButton>
        </div>
        <ul class="mt-12 grid max-w-lg grid-cols-1 gap-4 text-sm sm:grid-cols-3">
          <li v-for="perk in perks" :key="perk.label" class="flex items-center gap-2.5">
            <span class="bg-muted grid size-9 shrink-0 place-items-center rounded-full">
              <Icon :name="perk.icon" class="size-4" />
            </span>
            <span class="text-muted-foreground leading-tight">{{ perk.label }}</span>
          </li>
        </ul>
      </Motion>

      <Motion
        class="grid h-[440px] grid-cols-6 grid-rows-6 gap-3 sm:h-[560px] sm:gap-4"
        :initial="{ opacity: 0, scale: 0.96 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.1 }"
      >
        <div class="bg-muted col-span-4 row-span-4 overflow-hidden rounded-2xl sm:rounded-3xl">
          <img
            :src="images[0]"
            alt="Rust bomber jacket on a hanger"
            class="size-full object-cover"
          />
        </div>
        <div class="bg-muted col-span-2 row-span-3 overflow-hidden rounded-2xl sm:rounded-3xl">
          <img :src="images[1]" alt="Yellow over-ear headphones" class="size-full object-cover" />
        </div>
        <div class="bg-muted col-span-2 row-span-3 overflow-hidden rounded-2xl sm:rounded-3xl">
          <img
            :src="images[2]"
            alt="Soy candle burning in a glass jar"
            class="size-full object-cover"
          />
        </div>
        <div
          class="bg-card col-span-4 row-span-2 flex flex-col justify-center gap-2 rounded-2xl border p-4 shadow-sm sm:rounded-3xl sm:p-6"
        >
          <div class="flex items-center gap-2">
            <UiRating
              :model-value="4.9"
              size="sm"
              icon="mdi:star"
              filled-icon-class-name="text-amber-400"
            />
            <span class="text-sm font-semibold">4.9</span>
          </div>
          <p class="text-muted-foreground text-sm">
            “Beautifully made and it arrived in two days.”
          </p>
          <p class="text-xs font-medium">Sarah J. · 2,300+ verified reviews</p>
        </div>
      </Motion>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Perk = { icon: string; label: string };

  withDefaults(
    defineProps<{
      eyebrow?: string;
      title?: string;
      description?: string;
      perks?: Perk[];
      images?: [string, string, string];
    }>(),
    {
      eyebrow: "Autumn collection is here",
      title: "Everyday pieces made to last.",
      description:
        "Considered essentials in honest materials, from soft knits to stoneware. Designed in small batches and shipped free over $75.",
      perks: () => [
        { icon: "lucide:truck", label: "Free shipping over $75" },
        { icon: "lucide:rotate-ccw", label: "30 day free returns" },
        { icon: "lucide:shield-check", label: "2 year warranty" },
      ],
      images: () => [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=600&q=80",
      ],
    }
  );
</script>
