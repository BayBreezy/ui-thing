<template>
  <!--
    Frequently bought together bundle
    Features: Product photos joined by plus signs, a checklist that recalculates the bundle price as you tick items, size selects for apparel, an automatic bundle discount and one add all button
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ title }}</h2>
      <p class="text-muted-foreground mt-2">
        Save {{ discount }}% when you buy two or more of these together.
      </p>

      <div class="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-center">
        <ul class="flex items-center justify-center gap-2 sm:gap-4" aria-hidden="true">
          <template v-for="(item, i) in items" :key="item.id">
            <li v-if="i > 0" class="text-muted-foreground text-2xl font-light">+</li>
            <li
              class="bg-muted w-1/3 max-w-44 overflow-hidden rounded-xl transition"
              :class="selected.includes(item.id) ? '' : 'opacity-30 grayscale'"
            >
              <UiAspectRatio :ratio="1">
                <img :src="item.image" alt="" class="size-full object-cover" />
              </UiAspectRatio>
            </li>
          </template>
        </ul>

        <UiCard>
          <UiCardContent class="space-y-4">
            <p class="flex items-baseline gap-2">
              <span class="text-3xl font-semibold tabular-nums" aria-live="polite">
                {{ money.format(bundlePrice) }}
              </span>
              <span v-if="saving > 0" class="text-muted-foreground tabular-nums line-through">
                {{ money.format(subtotal) }}
              </span>
            </p>
            <p v-if="saving > 0" class="text-sm font-medium text-green-600 dark:text-green-400">
              You save {{ money.format(saving) }}
            </p>
            <p v-else class="text-muted-foreground text-sm">
              Add another item to unlock the discount.
            </p>
            <UiButton class="w-full" size="lg" :disabled="!selected.length" @click="addAll">
              <Icon :name="added ? 'lucide:check' : 'lucide:shopping-bag'" />
              {{
                added
                  ? "Added to cart"
                  : `Add ${selected.length} ${selected.length === 1 ? "item" : "items"} to cart`
              }}
            </UiButton>
          </UiCardContent>
        </UiCard>
      </div>

      <ul class="mt-8 divide-y border-y">
        <li v-for="item in items" :key="item.id" class="flex flex-wrap items-center gap-4 py-4">
          <UiCheckbox
            :id="`bundle-${item.id}`"
            :model-value="selected.includes(item.id)"
            :disabled="item.id === items[0]!.id"
            @update:model-value="toggle(item.id)"
          />
          <UiLabel :for="`bundle-${item.id}`" class="flex-1 cursor-pointer text-sm font-normal">
            <span class="font-medium"
              >{{ item.id === items[0]!.id ? "This item: " : "" }}{{ item.name }}</span
            >
            <span class="text-muted-foreground block text-xs">{{ item.category }}</span>
          </UiLabel>
          <UiSelect
            v-if="isSized(item)"
            :model-value="sizeFor[item.id]"
            @update:model-value="(v) => (sizeFor[item.id] = v as string)"
          >
            <UiSelectTrigger class="w-24" size="sm" :aria-label="`Size for ${item.name}`">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
          <span class="w-16 text-right text-sm font-semibold tabular-nums">
            {{ money.format(item.price) }}
          </span>
        </li>
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

  const props = withDefaults(
    defineProps<{
      title?: string;
      /** Percentage taken off when two or more items are selected. */
      discount?: number;
      sizes?: string[];
      /** The first item is the product being viewed and can not be unticked. */
      items?: Product[];
    }>(),
    {
      title: "Frequently bought together",
      discount: 10,
      sizes: () => ["S", "M", "L", "XL"],
      items: () => [
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
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const selected = ref<number[]>(props.items.map((item) => item.id));
  const sizeFor = reactive<Record<number, string>>(
    Object.fromEntries(props.items.map((item) => [item.id, "M"]))
  );
  const added = ref(false);

  const subtotal = computed(() =>
    props.items.filter((i) => selected.value.includes(i.id)).reduce((sum, i) => sum + i.price, 0)
  );
  const saving = computed(() =>
    selected.value.length > 1 ? (subtotal.value * props.discount) / 100 : 0
  );
  const bundlePrice = computed(() => subtotal.value - saving.value);

  function isSized(product: Product) {
    return ["Clothing", "Outerwear", "Footwear"].includes(product.category);
  }

  function toggle(id: number) {
    if (id === props.items[0]!.id) return;
    selected.value = selected.value.includes(id)
      ? selected.value.filter((i) => i !== id)
      : [...selected.value, id];
  }

  // Replace this with a call to your cart store or API.
  function addAll() {
    added.value = true;
    setTimeout(() => (added.value = false), 1800);
  }
</script>
