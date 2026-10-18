<template>
  <!--
    Recommended products carousel
    Features: Draggable Embla carousel with responsive slides, header arrows that disable at the ends, keyboard support, compact cards with rating and price
  -->
  <UiContainer class="py-16 lg:py-24">
    <UiCarousel
      v-slot="{ canScrollPrev, canScrollNext, scrollPrev, scrollNext }"
      :opts="{ align: 'start', dragFree: true }"
    >
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ title }}</h2>
          <p class="text-muted-foreground mt-2">{{ description }}</p>
        </div>
        <div class="flex gap-2">
          <UiButton
            variant="outline"
            size="icon"
            class="rounded-full"
            :disabled="!canScrollPrev"
            aria-label="Previous products"
            @click="scrollPrev"
          >
            <Icon name="lucide:arrow-left" />
          </UiButton>
          <UiButton
            variant="outline"
            size="icon"
            class="rounded-full"
            :disabled="!canScrollNext"
            aria-label="Next products"
            @click="scrollNext"
          >
            <Icon name="lucide:arrow-right" />
          </UiButton>
        </div>
      </div>

      <UiCarouselContent class="mt-8 -ml-4">
        <UiCarouselItem
          v-for="product in products"
          :key="product.id"
          grab-cursor
          class="basis-2/3 pl-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
        >
          <article class="group">
            <div class="bg-muted relative overflow-hidden rounded-xl">
              <UiAspectRatio :ratio="1">
                <img
                  :src="product.image"
                  :alt="product.name"
                  loading="lazy"
                  draggable="false"
                  class="size-full object-cover transition duration-500 group-hover:scale-105"
                />
              </UiAspectRatio>
              <UiBadge v-if="product.compareAt" variant="destructive" class="absolute top-3 left-3">
                Sale
              </UiBadge>
            </div>
            <div class="mt-3 space-y-1">
              <h3 class="truncate text-sm font-medium">
                <a :href="product.href" class="hover:underline">{{ product.name }}</a>
              </h3>
              <div class="flex items-center gap-1.5">
                <Icon name="mdi:star" class="size-3.5 text-amber-400" />
                <span class="text-xs">{{ product.rating.toFixed(1) }}</span>
                <span class="text-muted-foreground text-xs">({{ product.reviews }})</span>
              </div>
              <p class="flex items-baseline gap-2 text-sm">
                <span class="font-semibold">{{ money.format(product.price) }}</span>
                <span v-if="product.compareAt" class="text-muted-foreground text-xs line-through">
                  {{ money.format(product.compareAt) }}
                </span>
              </p>
            </div>
          </article>
        </UiCarouselItem>
      </UiCarouselContent>
    </UiCarousel>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    compareAt?: number;
    rating: number;
    reviews: number;
    badge?: string;
    colors: { name: string; hex: string }[];
    image: string;
    href: string;
  };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      products?: Product[];
    }>(),
    {
      title: "You might also like",
      description: "Picked from what other customers added to their carts.",
      products: () => [
        {
          id: 1,
          name: "Suede Brogue",
          category: "Footwear",
          price: 128,
          rating: 4.8,
          reviews: 214,
          badge: "New",
          colors: [
            { name: "Teal", hex: "#0f766e" },
            { name: "Tan", hex: "#b08968" },
          ],
          image:
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 2,
          name: "Minimal Watch",
          category: "Accessories",
          price: 149,
          compareAt: 189,
          rating: 4.6,
          reviews: 132,
          badge: "Sale",
          colors: [
            { name: "White", hex: "#f4f4f5" },
            { name: "Black", hex: "#18181b" },
          ],
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 3,
          name: "Sunny Headphones",
          category: "Audio",
          price: 89,
          rating: 4.5,
          reviews: 98,
          colors: [
            { name: "Yellow", hex: "#facc15" },
            { name: "Black", hex: "#18181b" },
          ],
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 4,
          name: "Studio Over-Ear",
          category: "Audio",
          price: 199,
          compareAt: 249,
          rating: 4.9,
          reviews: 341,
          badge: "Best seller",
          colors: [
            { name: "Black", hex: "#18181b" },
            { name: "Grey", hex: "#71717a" },
          ],
          image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 5,
          name: "Commuter Backpack",
          category: "Bags",
          price: 98,
          rating: 4.7,
          reviews: 187,
          colors: [
            { name: "Navy", hex: "#1e3a5f" },
            { name: "Charcoal", hex: "#3f3f46" },
          ],
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 6,
          name: "Trail Backpack",
          category: "Bags",
          price: 119,
          rating: 4.4,
          reviews: 76,
          badge: "New",
          colors: [
            { name: "Olive", hex: "#4d5d3a" },
            { name: "Sand", hex: "#d6c3a1" },
          ],
          image:
            "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 7,
          name: "Bomber Jacket",
          category: "Outerwear",
          price: 138,
          compareAt: 168,
          rating: 4.6,
          reviews: 59,
          badge: "Sale",
          colors: [
            { name: "Rust", hex: "#b4532a" },
            { name: "Olive", hex: "#4d5d3a" },
          ],
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 8,
          name: "Knit Poncho",
          category: "Clothing",
          price: 76,
          rating: 4.3,
          reviews: 41,
          colors: [{ name: "Cream", hex: "#f3e9d2" }],
          image:
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 9,
          name: "Classic Tee",
          category: "Clothing",
          price: 32,
          rating: 4.7,
          reviews: 512,
          badge: "Best seller",
          colors: [
            { name: "White", hex: "#f4f4f5" },
            { name: "Black", hex: "#18181b" },
            { name: "Sage", hex: "#9caf88" },
          ],
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 10,
          name: "Stoneware Mug",
          category: "Home",
          price: 24,
          rating: 4.8,
          reviews: 266,
          colors: [{ name: "White", hex: "#f4f4f5" }],
          image:
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 11,
          name: "Canvas Tote",
          category: "Bags",
          price: 28,
          rating: 4.5,
          reviews: 120,
          colors: [{ name: "Natural", hex: "#c8a77a" }],
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 12,
          name: "Corduroy Dress",
          category: "Clothing",
          price: 110,
          rating: 4.6,
          reviews: 64,
          badge: "New",
          colors: [
            { name: "Burgundy", hex: "#7f1d3a" },
            { name: "Navy", hex: "#1e3a5f" },
          ],
          image:
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 13,
          name: "Soy Candle",
          category: "Home",
          price: 34,
          rating: 4.9,
          reviews: 301,
          colors: [{ name: "Amber", hex: "#d97706" }],
          image:
            "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
        {
          id: 14,
          name: "Crew Sweatshirt",
          category: "Clothing",
          price: 58,
          rating: 4.4,
          reviews: 88,
          colors: [
            { name: "White", hex: "#f4f4f5" },
            { name: "Grey", hex: "#a1a1aa" },
          ],
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
          href: "#",
        },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
</script>
