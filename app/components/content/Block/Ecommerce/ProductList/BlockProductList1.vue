<template>
  <!--
    Product grid with wishlist and quick add
    Features: Four column responsive grid, new and sale badges, compare at pricing, star ratings, a wishlist heart toggle and an add to cart button that slides in on hover and confirms with a check
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
        <p class="text-muted-foreground mt-2 max-w-xl">{{ description }}</p>
      </div>
      <UiButton variant="outline" size="sm" class="w-fit">
        View all
        <Icon name="lucide:arrow-right" />
      </UiButton>
    </div>

    <ul class="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
      <Motion
        v-for="(product, i) in products.slice(0, 8)"
        :key="product.id"
        as="li"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.4, delay: (i % 4) * 0.07 }"
      >
        <div class="group relative">
          <div class="bg-muted relative overflow-hidden rounded-xl">
            <UiAspectRatio :ratio="4 / 5">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="size-full object-cover transition duration-500 group-hover:scale-105"
              />
            </UiAspectRatio>
            <UiBadge
              v-if="product.badge"
              :variant="badgeVariant(product.badge)"
              class="absolute top-3 left-3"
            >
              {{ product.badge }}
            </UiBadge>
            <button
              type="button"
              class="bg-background/90 hover:bg-background focus-visible:ring-ring absolute top-3 right-3 grid size-8 place-items-center rounded-full shadow-sm backdrop-blur transition focus-visible:ring-2 focus-visible:outline-none"
              :aria-pressed="wishlist.includes(product.id)"
              :aria-label="`${wishlist.includes(product.id) ? 'Remove' : 'Add'} ${product.name} ${wishlist.includes(product.id) ? 'from' : 'to'} wishlist`"
              @click="toggleWishlist(product.id)"
            >
              <Icon
                name="lucide:heart"
                class="size-4 transition"
                :class="
                  wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-foreground'
                "
              />
            </button>
            <div
              class="absolute inset-x-3 bottom-3 transition duration-300 lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            >
              <UiButton
                class="w-full shadow-md"
                size="sm"
                :variant="added.includes(product.id) ? 'secondary' : 'default'"
                @click="addToCart(product.id)"
              >
                <Icon :name="added.includes(product.id) ? 'lucide:check' : 'lucide:shopping-bag'" />
                {{ added.includes(product.id) ? "Added" : "Add to cart" }}
              </UiButton>
            </div>
          </div>

          <div class="mt-4 space-y-1.5">
            <p class="text-muted-foreground text-xs tracking-wide uppercase">
              {{ product.category }}
            </p>
            <h3 class="font-medium">
              <a :href="product.href" class="hover:underline">{{ product.name }}</a>
            </h3>
            <div class="flex items-center gap-1.5">
              <UiRating
                :model-value="product.rating"
                size="sm"
                icon="mdi:star"
                filled-icon-class-name="text-amber-400"
              />
              <span class="text-muted-foreground text-xs">({{ product.reviews }})</span>
            </div>
            <p class="flex items-baseline gap-2 text-sm">
              <span class="font-semibold">{{ money.format(product.price) }}</span>
              <span v-if="product.compareAt" class="text-muted-foreground text-xs line-through">
                {{ money.format(product.compareAt) }}
              </span>
            </p>
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
      products?: Product[];
    }>(),
    {
      title: "New arrivals",
      description: "Small-batch essentials, restocked every week. Free returns on everything.",
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

  const wishlist = ref<number[]>([]);
  const added = ref<number[]>([]);

  function badgeVariant(badge: string) {
    if (badge === "Sale") return "destructive";
    if (badge === "New") return "default";
    return "secondary";
  }

  function toggleWishlist(id: number) {
    wishlist.value = wishlist.value.includes(id)
      ? wishlist.value.filter((x) => x !== id)
      : [...wishlist.value, id];
  }

  // Replace this with a call to your cart store or API.
  function addToCart(id: number) {
    if (added.value.includes(id)) return;
    added.value = [...added.value, id];
    setTimeout(() => {
      added.value = added.value.filter((x) => x !== id);
    }, 1600);
  }
</script>
