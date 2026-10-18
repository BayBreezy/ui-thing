<template>
  <!--
    Product grid with a quick view dialog
    Features: Hover quick view button on every card, dialog with large image, color swatches, size picker, quantity stepper and add to cart, focus is trapped and restored by the dialog
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
      <p class="text-muted-foreground mt-2">{{ description }}</p>
    </div>

    <ul class="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
      <li v-for="product in products.slice(0, 8)" :key="product.id" class="group">
        <div class="bg-muted relative overflow-hidden rounded-xl">
          <UiAspectRatio :ratio="4 / 5">
            <img
              :src="product.image"
              :alt="product.name"
              loading="lazy"
              class="size-full object-cover transition duration-500 group-hover:scale-105"
            />
          </UiAspectRatio>
          <div
            class="absolute inset-x-3 bottom-3 transition duration-300 lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          >
            <UiButton
              variant="secondary"
              size="sm"
              class="w-full shadow-md"
              @click="openQuickView(product)"
            >
              <Icon name="lucide:eye" />
              Quick view
            </UiButton>
          </div>
        </div>
        <div class="mt-4 space-y-1">
          <h3 class="text-sm font-medium">{{ product.name }}</h3>
          <p class="flex items-baseline gap-2 text-sm">
            <span class="font-semibold">{{ money.format(product.price) }}</span>
            <span v-if="product.compareAt" class="text-muted-foreground text-xs line-through">
              {{ money.format(product.compareAt) }}
            </span>
          </p>
        </div>
      </li>
    </ul>

    <UiDialog v-model:open="open">
      <UiDialogContent class="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <template v-if="active">
          <UiDialogTitle class="sr-only">{{ active.name }}</UiDialogTitle>
          <UiDialogDescription class="sr-only">
            Quick view of {{ active.name }}. Choose options and add it to your cart.
          </UiDialogDescription>
          <div class="grid sm:grid-cols-2">
            <div class="bg-muted relative aspect-square sm:aspect-auto">
              <img
                :src="active.image"
                :alt="active.name"
                class="absolute inset-0 size-full object-cover"
              />
            </div>
            <div class="flex flex-col gap-5 p-6 sm:p-8">
              <div class="space-y-2">
                <p class="text-muted-foreground text-xs tracking-wide uppercase">
                  {{ active.category }}
                </p>
                <h3 class="text-2xl font-semibold">{{ active.name }}</h3>
                <div class="flex items-center gap-2">
                  <UiRating
                    :model-value="active.rating"
                    size="sm"
                    icon="mdi:star"
                    filled-icon-class-name="text-amber-400"
                  />
                  <span class="text-muted-foreground text-sm">{{ active.reviews }} reviews</span>
                </div>
                <p class="flex items-baseline gap-2">
                  <span class="text-2xl font-semibold">{{ money.format(active.price) }}</span>
                  <span v-if="active.compareAt" class="text-muted-foreground line-through">
                    {{ money.format(active.compareAt) }}
                  </span>
                </p>
              </div>

              <fieldset>
                <legend class="mb-2 text-sm font-medium">
                  Color: <span class="text-muted-foreground font-normal">{{ color?.name }}</span>
                </legend>
                <div class="flex gap-2">
                  <button
                    v-for="c in active.colors"
                    :key="c.hex"
                    type="button"
                    class="focus-visible:ring-ring size-8 rounded-full border transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    :class="color?.hex === c.hex ? 'ring-primary ring-2 ring-offset-2' : ''"
                    :style="{ backgroundColor: c.hex }"
                    :aria-label="c.name"
                    :aria-pressed="color?.hex === c.hex"
                    @click="color = c"
                  />
                </div>
              </fieldset>

              <fieldset v-if="hasSizes(active)">
                <legend class="mb-2 text-sm font-medium">Size</legend>
                <UiToggleGroup
                  type="single"
                  variant="outline"
                  size="sm"
                  class="justify-start"
                  :model-value="size"
                  @update:model-value="(v) => (size = (v as string) || size)"
                >
                  <UiToggleGroupItem v-for="s in sizes" :key="s" :value="s" class="w-10">
                    {{ s }}
                  </UiToggleGroupItem>
                </UiToggleGroup>
              </fieldset>

              <div class="mt-auto flex items-center gap-3 pt-2">
                <UiNumberField v-model="quantity" :min="1" :max="10" class="w-32">
                  <UiNumberFieldDecrement />
                  <UiNumberFieldInput class="text-center" aria-label="Quantity" />
                  <UiNumberFieldIncrement />
                </UiNumberField>
                <UiButton class="flex-1" @click="addToCart">
                  <Icon :name="added ? 'lucide:check' : 'lucide:shopping-bag'" />
                  {{ added ? "Added to cart" : "Add to cart" }}
                </UiButton>
              </div>
              <a
                :href="active.href"
                class="text-muted-foreground hover:text-foreground text-center text-sm underline underline-offset-4"
              >
                View full details
              </a>
            </div>
          </div>
        </template>
      </UiDialogContent>
    </UiDialog>
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
      title: "Best sellers",
      description: "Peek at the details without leaving the page.",
      sizes: () => ["XS", "S", "M", "L", "XL"],
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
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const open = ref(false);
  const active = ref<Product | null>(null);
  const color = ref<Product["colors"][number]>();
  const size = ref("M");
  const quantity = ref(1);
  const added = ref(false);

  // Sizes only make sense for wearable categories. Adjust this to fit your catalog.
  function hasSizes(product: Product) {
    return ["Clothing", "Outerwear", "Footwear"].includes(product.category);
  }

  function openQuickView(product: Product) {
    active.value = product;
    color.value = product.colors[0];
    size.value = "M";
    quantity.value = 1;
    added.value = false;
    open.value = true;
  }

  // Replace this with a call to your cart store or API.
  function addToCart() {
    added.value = true;
    setTimeout(() => {
      added.value = false;
      open.value = false;
    }, 1200);
  }
</script>
