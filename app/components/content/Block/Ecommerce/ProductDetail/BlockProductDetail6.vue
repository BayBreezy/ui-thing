<template>
  <!--
    Complete the look related products
    Features: Row of related products where choosing a size on hover adds the item straight to the cart, sizes stay visible on touch screens, items without sizes get a plain add button and every card confirms what was added
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ title }}</h2>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <p class="text-sm" role="status" aria-live="polite">
        <template v-if="Object.keys(added).length">
          <Icon name="lucide:check" class="mr-1 inline size-4 text-green-600 dark:text-green-400" />
          {{ Object.keys(added).length }} added to your cart
        </template>
      </p>
    </div>

    <ul class="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
      <Motion
        v-for="(product, i) in products"
        :key="product.id"
        as="li"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.4, delay: i * 0.07 }"
      >
        <div class="group">
          <div class="bg-muted relative overflow-hidden rounded-xl">
            <UiAspectRatio :ratio="4 / 5">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="size-full object-cover transition duration-500 group-hover:scale-105"
              />
            </UiAspectRatio>
            <UiBadge v-if="added[product.id]" class="absolute top-3 left-3 gap-1">
              <Icon name="lucide:check" />
              Added{{ added[product.id] === "one-size" ? "" : ` · ${added[product.id]}` }}
            </UiBadge>

            <div
              class="from-background/90 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-3 pt-10 transition duration-300 lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            >
              <template v-if="isSized(product)">
                <p class="mb-2 text-xs font-medium">Quick add</p>
                <div class="flex gap-1.5">
                  <button
                    v-for="s in sizes"
                    :key="s"
                    type="button"
                    class="bg-background hover:bg-primary hover:text-primary-foreground focus-visible:ring-ring h-8 flex-1 rounded-md border text-xs font-medium transition focus-visible:ring-2 focus-visible:outline-none"
                    :aria-label="`Add ${product.name} in size ${s} to cart`"
                    @click="quickAdd(product.id, s)"
                  >
                    {{ s }}
                  </button>
                </div>
              </template>
              <UiButton v-else size="sm" class="w-full" @click="quickAdd(product.id, 'one-size')">
                <Icon name="lucide:shopping-bag" />
                Add to cart
              </UiButton>
            </div>
          </div>

          <div class="mt-4 space-y-1">
            <h3 class="text-sm font-medium">
              <a :href="product.href" class="hover:underline">{{ product.name }}</a>
            </h3>
            <p class="text-muted-foreground text-xs">{{ product.category }}</p>
            <p class="text-sm font-semibold">{{ money.format(product.price) }}</p>
          </div>
        </div>
      </Motion>
    </ul>
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
      sizes?: string[];
      products?: Product[];
    }>(),
    {
      title: "Complete the look",
      description: "Pieces our customers wear with the bomber jacket.",
      sizes: () => ["S", "M", "L", "XL"],
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

  // Product id mapped to the size that was added.
  const added = ref<Record<number, string>>({});

  function isSized(product: Product) {
    return ["Clothing", "Outerwear", "Footwear"].includes(product.category);
  }

  // Replace this with a call to your cart store or API.
  function quickAdd(id: number, size: string) {
    added.value = { ...added.value, [id]: size };
  }
</script>
