<template>
  <!--
    Centered shop hero with category tiles
    Features: Centered headline with two calls to action, a promo strip, and four image tiles that link straight into the main categories with a hover lift
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <a
          href="#"
          class="bg-muted hover:bg-muted/70 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition"
        >
          <span class="font-medium">{{ promo }}</span>
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </a>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ title }}
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">{{ description }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg">Shop new arrivals</UiButton>
          <UiButton variant="outline" size="lg">See best sellers</UiButton>
        </div>
      </Motion>
    </div>

    <ul class="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      <Motion
        v-for="(category, i) in categories"
        :key="category.name"
        as="li"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.45, delay: 0.15 + i * 0.08 }"
      >
        <a
          :href="category.href"
          class="group focus-visible:ring-ring block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <div class="bg-muted overflow-hidden rounded-2xl">
            <UiAspectRatio :ratio="1">
              <img
                :src="category.image"
                :alt="category.name"
                loading="lazy"
                class="size-full object-cover transition duration-500 group-hover:scale-105"
              />
            </UiAspectRatio>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <span class="font-medium">{{ category.name }}</span>
            <Icon
              name="lucide:arrow-up-right"
              class="text-muted-foreground size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </a>
      </Motion>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Category = { name: string; image: string; href: string };

  withDefaults(
    defineProps<{
      promo?: string;
      title?: string;
      description?: string;
      categories?: Category[];
    }>(),
    {
      promo: "Free shipping on orders over $75",
      title: "Find something you will keep for years.",
      description:
        "Footwear, audio, bags and home goods, chosen for how well they age. Browse by category or start with what is new this week.",
      categories: () => [
        {
          name: "Footwear",
          image:
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=700&q=80",
          href: "#",
        },
        {
          name: "Audio",
          image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",
          href: "#",
        },
        {
          name: "Bags",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
          href: "#",
        },
        {
          name: "Home",
          image:
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
          href: "#",
        },
      ],
    }
  );
</script>
