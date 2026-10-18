<template>
  <!--
    Product listing with grid and list view toggle
    Features: Switch between a three column grid and a detailed list, the choice animates, list rows show rating, colors and a buy button, and the toggle is keyboard accessible
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="flex items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
        <p class="text-muted-foreground mt-2">{{ products.length }} products</p>
      </div>
      <UiToggleGroup
        type="single"
        :model-value="view"
        aria-label="Layout"
        @update:model-value="(v) => (view = (v as 'grid' | 'list') || view)"
      >
        <UiToggleGroupItem
          variant="outline"
          size="sm"
          value="grid"
          aria-label="Grid view"
          icon="lucide:layout-grid"
        />
        <UiToggleGroupItem
          variant="outline"
          size="sm"
          value="list"
          aria-label="List view"
          icon="lucide:list"
        />
      </UiToggleGroup>
    </div>

    <ul
      class="mt-10 grid gap-x-6 gap-y-10"
      :class="view === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 gap-y-6'"
    >
      <Motion
        v-for="product in products"
        :key="product.id"
        as="li"
        layout
        :transition="{ duration: 0.3 }"
      >
        <article
          class="group"
          :class="view === 'list' ? 'flex gap-5 rounded-xl border p-3 sm:gap-6 sm:p-4' : ''"
        >
          <div
            class="bg-muted relative shrink-0 overflow-hidden rounded-lg"
            :class="view === 'list' ? 'w-28 sm:w-44' : 'w-full rounded-xl'"
          >
            <UiAspectRatio :ratio="view === 'list' ? 1 : 4 / 5">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="size-full object-cover transition duration-500 group-hover:scale-105"
              />
            </UiAspectRatio>
            <UiBadge
              v-if="product.badge"
              :variant="product.badge === 'Sale' ? 'destructive' : 'secondary'"
              class="absolute top-2 left-2"
            >
              {{ product.badge }}
            </UiBadge>
          </div>

          <div
            :class="
              view === 'list'
                ? 'flex min-w-0 flex-1 flex-col justify-between gap-3 py-1'
                : 'mt-4 space-y-1.5'
            "
          >
            <div class="space-y-1.5">
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
              <div v-if="view === 'list'" class="flex items-center gap-1.5">
                <span
                  v-for="color in product.colors"
                  :key="color.hex"
                  class="size-4 rounded-full border"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                />
              </div>
            </div>
            <div
              class="flex items-center justify-between gap-3"
              :class="view === 'grid' ? 'pt-1' : ''"
            >
              <p class="flex items-baseline gap-2 text-sm">
                <span class="text-base font-semibold">{{ money.format(product.price) }}</span>
                <span v-if="product.compareAt" class="text-muted-foreground text-xs line-through">
                  {{ money.format(product.compareAt) }}
                </span>
              </p>
              <UiButton v-if="view === 'list'" size="sm">
                <Icon name="lucide:shopping-bag" />
                <span class="hidden sm:inline">Add to cart</span>
                <span class="sr-only sm:hidden">Add {{ product.name }} to cart</span>
              </UiButton>
            </div>
          </div>
        </article>
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
      products?: Product[];
    }>(),
    {
      title: "Everyday essentials",
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
      ],
    }
  );

  const view = ref<"grid" | "list">("grid");

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
</script>
