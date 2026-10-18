<template>
  <!--
    Product listing with sidebar filters, sorting and pagination
    Features: Category checkboxes with counts, price range slider, on sale filter, sort select, live result count, pagination that resets when filters change and an empty state with a clear button
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2" role="status" aria-live="polite">
          {{ filtered.length }} {{ filtered.length === 1 ? "product" : "products" }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UiLabel for="sort" class="text-muted-foreground text-sm whitespace-nowrap">
          Sort by
        </UiLabel>
        <UiSelect v-model="sort">
          <UiSelectTrigger id="sort" class="w-48">
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="o in sortOptions" :key="o.value" :value="o.value">
              {{ o.label }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
    </div>

    <div class="mt-10 grid gap-10 lg:grid-cols-[16rem_1fr]">
      <aside aria-label="Filters">
        <UiAccordion type="multiple" :default-value="['category', 'price', 'more']">
          <UiAccordionItem value="category">
            <UiAccordionHeader>
              <UiAccordionTrigger title="Category" />
            </UiAccordionHeader>
            <UiAccordionContent>
              <ul class="space-y-3">
                <li v-for="c in categories" :key="c.name" class="flex items-center gap-2.5">
                  <UiCheckbox
                    :id="`cat-${c.name}`"
                    :model-value="selected.includes(c.name)"
                    @update:model-value="toggleCategory(c.name)"
                  />
                  <UiLabel :for="`cat-${c.name}`" class="flex-1 font-normal">{{ c.name }}</UiLabel>
                  <span class="text-muted-foreground text-xs tabular-nums">{{ c.count }}</span>
                </li>
              </ul>
            </UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="price">
            <UiAccordionHeader>
              <UiAccordionTrigger title="Price" />
            </UiAccordionHeader>
            <UiAccordionContent>
              <div class="px-1 pt-2">
                <UiSlider
                  v-model="range"
                  :min="0"
                  :max="250"
                  :step="5"
                  :min-steps-between-thumbs="1"
                  aria-label="Price range"
                />
                <div class="text-muted-foreground mt-4 flex justify-between text-sm tabular-nums">
                  <span>{{ money.format(range[0]!) }}</span>
                  <span>{{ money.format(range[1]!) }}{{ range[1] === 250 ? "+" : "" }}</span>
                </div>
              </div>
            </UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="more">
            <UiAccordionHeader>
              <UiAccordionTrigger title="More" />
            </UiAccordionHeader>
            <UiAccordionContent>
              <div class="flex items-center gap-2.5">
                <UiCheckbox id="on-sale" v-model="onSale" />
                <UiLabel for="on-sale" class="font-normal">On sale</UiLabel>
              </div>
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
        <UiButton
          v-if="hasFilters"
          variant="ghost"
          size="sm"
          class="mt-3 w-full"
          @click="clearFilters"
        >
          <Icon name="lucide:x" />
          Clear all filters
        </UiButton>
      </aside>

      <div>
        <ul v-if="paged.length" class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
          <li v-for="product in paged" :key="product.id" class="group">
            <div class="bg-muted relative overflow-hidden rounded-xl">
              <UiAspectRatio :ratio="1">
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
                class="absolute top-3 left-3"
              >
                {{ product.badge }}
              </UiBadge>
            </div>
            <div class="mt-3 space-y-1">
              <h2 class="text-sm font-medium">
                <a :href="product.href" class="hover:underline">{{ product.name }}</a>
              </h2>
              <p class="text-muted-foreground text-xs">{{ product.category }}</p>
              <p class="flex items-baseline gap-2 text-sm">
                <span class="font-semibold">{{ money.format(product.price) }}</span>
                <span v-if="product.compareAt" class="text-muted-foreground text-xs line-through">
                  {{ money.format(product.compareAt) }}
                </span>
              </p>
            </div>
          </li>
        </ul>

        <UiEmpty v-else class="border border-dashed">
          <UiEmptyHeader>
            <UiEmptyMedia>
              <UiFancyIcon icon="lucide:search-x" theme="modern-neue" />
            </UiEmptyMedia>
            <UiEmptyTitle>No products match</UiEmptyTitle>
            <UiEmptyDescription>
              Try widening the price range or removing a category.
            </UiEmptyDescription>
          </UiEmptyHeader>
          <UiEmptyContent>
            <UiButton variant="outline" @click="clearFilters">Clear filters</UiButton>
          </UiEmptyContent>
        </UiEmpty>

        <UiPagination
          v-if="filtered.length > perPage"
          v-model:page="page"
          :total="filtered.length"
          :items-per-page="perPage"
          :sibling-count="1"
          class="mt-12"
        />
      </div>
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

  const props = withDefaults(
    defineProps<{
      title?: string;
      perPage?: number;
      products?: Product[];
    }>(),
    {
      title: "All products",
      perPage: 6,
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

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "rating", label: "Top rated" },
  ];

  const sort = ref("featured");
  const selected = ref<string[]>([]);
  const range = ref([0, 250]);
  const onSale = ref(false);
  const page = ref(1);

  const categories = computed(() => {
    const counts = new Map<string, number>();
    for (const p of props.products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [...counts].map(([name, count]) => ({ name, count }));
  });

  const hasFilters = computed(
    () =>
      selected.value.length > 0 || onSale.value || range.value[0] !== 0 || range.value[1] !== 250
  );

  const filtered = computed(() => {
    const [min, max] = range.value as [number, number];
    const list = props.products.filter(
      (p) =>
        (!selected.value.length || selected.value.includes(p.category)) &&
        p.price >= min &&
        (max === 250 || p.price <= max) &&
        (!onSale.value || p.compareAt)
    );
    if (sort.value === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort.value === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort.value === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  });

  const paged = computed(() =>
    filtered.value.slice((page.value - 1) * props.perPage, page.value * props.perPage)
  );

  watch([selected, range, onSale, sort], () => (page.value = 1), { deep: true });

  function toggleCategory(name: string) {
    selected.value = selected.value.includes(name)
      ? selected.value.filter((c) => c !== name)
      : [...selected.value, name];
  }

  function clearFilters() {
    selected.value = [];
    range.value = [0, 250];
    onSale.value = false;
  }
</script>
