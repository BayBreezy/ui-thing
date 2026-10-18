<template>
  <!--
    Product grid with a top filter bar
    Features: Category chips, on sale toggle, sort select, color dots on every card, live result count and a one click reset, all filtering happens on the client
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
      <p class="text-muted-foreground mt-2">{{ description }}</p>
    </div>

    <div
      class="mt-10 flex flex-col gap-4 border-y py-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <UiScrollArea orientation="horizontal" class="w-full lg:w-auto">
        <UiToggleGroup
          type="single"
          class="justify-start gap-2 pb-3 lg:pb-0"
          :model-value="category"
          aria-label="Filter by category"
          @update:model-value="(v) => (category = (v as string) || 'All')"
        >
          <UiToggleGroupItem
            v-for="c in categories"
            :key="c"
            variant="outline"
            size="sm"
            :value="c"
            class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-full px-4"
          >
            {{ c }}
          </UiToggleGroupItem>
        </UiToggleGroup>
      </UiScrollArea>

      <div class="flex items-center gap-3">
        <UiToggle v-model="onSale" variant="outline" size="sm" aria-label="Show sale items only">
          <Icon name="lucide:tag" />
          On sale
        </UiToggle>
        <UiSelect v-model="sort">
          <UiSelectTrigger class="w-44" size="sm" aria-label="Sort products">
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="featured">Featured</UiSelectItem>
            <UiSelectItem value="price-asc">Price: low to high</UiSelectItem>
            <UiSelectItem value="price-desc">Price: high to low</UiSelectItem>
            <UiSelectItem value="rating">Top rated</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm" role="status" aria-live="polite">
      Showing {{ filtered.length }} of {{ products.length }} products
      <button
        v-if="category !== 'All' || onSale"
        type="button"
        class="text-foreground ml-2 underline underline-offset-4"
        @click="reset"
      >
        Reset
      </button>
    </p>

    <ul v-if="filtered.length" class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
      <li v-for="product in filtered" :key="product.id" class="group">
        <div class="bg-muted relative overflow-hidden rounded-xl">
          <UiAspectRatio :ratio="1">
            <img
              :src="product.image"
              :alt="product.name"
              loading="lazy"
              class="size-full object-cover transition duration-500 group-hover:scale-105"
            />
          </UiAspectRatio>
          <UiBadge v-if="product.compareAt" variant="destructive" class="absolute top-3 left-3">
            -{{ Math.round((1 - product.price / product.compareAt) * 100) }}%
          </UiBadge>
        </div>
        <div class="mt-3 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="truncate text-sm font-medium">
              <a :href="product.href" class="hover:underline">{{ product.name }}</a>
            </h3>
            <div class="mt-1.5 flex items-center gap-1" aria-label="Available colors">
              <span
                v-for="color in product.colors"
                :key="color.hex"
                class="size-3.5 rounded-full border"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
              />
            </div>
          </div>
          <p class="text-right text-sm">
            <span class="font-semibold">{{ money.format(product.price) }}</span>
            <span v-if="product.compareAt" class="text-muted-foreground block text-xs line-through">
              {{ money.format(product.compareAt) }}
            </span>
          </p>
        </div>
      </li>
    </ul>
    <p v-else class="text-muted-foreground mt-16 text-center">
      Nothing here yet. Try another category.
    </p>
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

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      products?: Product[];
    }>(),
    {
      title: "Shop the collection",
      description: "Filter by category, find what is on sale and sort by what matters to you.",
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

  const category = ref("All");
  const onSale = ref(false);
  const sort = ref("featured");

  const categories = computed(() => ["All", ...new Set(props.products.map((p) => p.category))]);

  const filtered = computed(() => {
    const list = props.products.filter(
      (p) =>
        (category.value === "All" || p.category === category.value) &&
        (!onSale.value || p.compareAt)
    );
    if (sort.value === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort.value === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort.value === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  });

  function reset() {
    category.value = "All";
    onSale.value = false;
  }
</script>
