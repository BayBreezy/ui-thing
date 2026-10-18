<template>
  <!--
    Empty cart with product suggestions
    Features: Centered empty state with an icon, clear next steps and a wishlist link, popular category chips and a row of suggested products so shoppers always have somewhere to go
  -->
  <UiContainer class="py-16 lg:py-24">
    <UiEmpty class="border border-dashed py-16">
      <UiEmptyHeader>
        <UiEmptyMedia>
          <UiFancyIcon icon="lucide:shopping-bag" theme="modern-neue" />
        </UiEmptyMedia>
        <UiEmptyTitle>{{ title }}</UiEmptyTitle>
        <UiEmptyDescription>{{ description }}</UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <div class="flex flex-wrap justify-center gap-3">
          <UiButton size="lg">
            Start shopping
            <Icon name="lucide:arrow-right" />
          </UiButton>
          <UiButton size="lg" variant="outline">
            <Icon name="lucide:heart" />
            View wishlist
          </UiButton>
        </div>
        <ul
          class="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-3"
          aria-label="Popular categories"
        >
          <li v-for="category in categories" :key="category">
            <a href="#" class="hover:bg-accent rounded-full border px-4 py-1.5 text-sm transition">
              {{ category }}
            </a>
          </li>
        </ul>
      </UiEmptyContent>
    </UiEmpty>

    <div class="mt-16">
      <h2 class="text-xl font-semibold tracking-tight">Popular right now</h2>
      <ul class="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
        <Motion
          v-for="(product, i) in products"
          :key="product.id"
          as="li"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.4, delay: i * 0.07 }"
        >
          <a :href="product.href" class="group block">
            <div class="bg-muted overflow-hidden rounded-xl">
              <UiAspectRatio :ratio="1">
                <img
                  :src="product.image"
                  :alt="product.name"
                  loading="lazy"
                  class="size-full object-cover transition duration-500 group-hover:scale-105"
                />
              </UiAspectRatio>
            </div>
            <div class="mt-3 flex items-start justify-between gap-2">
              <div>
                <p class="text-sm font-medium group-hover:underline">{{ product.name }}</p>
                <p class="text-muted-foreground text-xs">{{ product.category }}</p>
              </div>
              <p class="text-sm font-semibold">{{ money.format(product.price) }}</p>
            </div>
          </a>
        </Motion>
      </ul>
    </div>
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
      categories?: string[];
      products?: Product[];
    }>(),
    {
      title: "Your cart is empty",
      description: "Looks like you have not added anything yet. Pick up where you left off below.",
      categories: () => ["New arrivals", "Best sellers", "Footwear", "Bags", "Home", "Sale"],
      products: () => [
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
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
</script>
