<template>
  <!--
    Product page with quantity stepper and cart confirmation
    Features: Size select, quantity stepper with a live subtotal announced to screen readers, add to cart that reveals an inline confirmation with view cart and continue shopping actions, and a cart counter in the header
  -->
  <UiContainer class="py-10 lg:py-16">
    <div class="mb-8 flex items-center justify-between">
      <UiBreadcrumbs :items="breadcrumbs" />
      <UiButton variant="outline" size="sm" :aria-label="`Cart, ${cartCount} items`">
        <Icon name="lucide:shopping-bag" />
        Cart
        <UiBadge size="sm" shape="pill">{{ cartCount }}</UiBadge>
      </UiButton>
    </div>

    <div class="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div class="bg-muted overflow-hidden rounded-2xl">
        <UiAspectRatio :ratio="4 / 5">
          <img
            :src="product.images[0]!.src"
            :alt="product.images[0]!.alt"
            class="size-full object-cover"
          />
        </UiAspectRatio>
      </div>

      <div>
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ product.name }}</h1>
        <div class="mt-3 flex items-center gap-2">
          <UiRating
            :model-value="product.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="text-muted-foreground text-sm">{{ product.reviews }} reviews</span>
        </div>
        <p class="mt-5 flex items-baseline gap-3">
          <span class="text-3xl font-semibold">{{ money.format(product.price) }}</span>
          <span v-if="product.compareAt" class="text-muted-foreground text-lg line-through">
            {{ money.format(product.compareAt) }}
          </span>
        </p>
        <p class="text-muted-foreground mt-5">{{ product.description }}</p>

        <div class="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <UiLabel for="detail-size" class="mb-2">Size</UiLabel>
            <UiSelect v-model="size">
              <UiSelectTrigger id="detail-size" class="w-full">
                <UiSelectValue placeholder="Select a size" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem
                  v-for="s in product.sizes"
                  :key="s.label"
                  :value="s.label"
                  :disabled="!s.inStock"
                >
                  {{ s.label }}{{ s.inStock ? "" : " · out of stock" }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div>
            <UiLabel for="detail-qty" class="mb-2">Quantity</UiLabel>
            <UiNumberField v-model="quantity" :min="1" :max="stock">
              <UiNumberFieldDecrement />
              <UiNumberFieldInput id="detail-qty" class="text-center" />
              <UiNumberFieldIncrement />
            </UiNumberField>
          </div>
        </div>

        <p class="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
          <span class="size-2 rounded-full bg-green-500" aria-hidden="true" />
          In stock, only {{ stock }} left in this color
        </p>

        <div class="mt-6 flex items-center justify-between border-t pt-6">
          <span class="text-muted-foreground">Subtotal</span>
          <span class="text-xl font-semibold" aria-live="polite">{{ money.format(subtotal) }}</span>
        </div>

        <UiButton class="mt-6 w-full" size="lg" :disabled="!size" @click="addToCart">
          <Icon name="lucide:shopping-bag" />
          {{ size ? "Add to cart" : "Select a size to continue" }}
        </UiButton>

        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 translate-y-2"
          leave-active-class="transition duration-200"
          leave-to-class="opacity-0"
        >
          <div
            v-if="confirmation"
            class="bg-muted/50 mt-6 rounded-xl border p-4"
            role="status"
            aria-live="polite"
          >
            <div class="flex items-start gap-3">
              <span
                class="grid size-8 shrink-0 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
              >
                <Icon name="lucide:check" class="size-4" />
              </span>
              <div class="flex-1">
                <p class="font-medium">Added to your cart</p>
                <p class="text-muted-foreground text-sm">
                  {{ confirmation.quantity }} × {{ product.name }}, size {{ confirmation.size }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <UiButton size="sm">View cart</UiButton>
                  <UiButton size="sm" variant="outline" @click="confirmation = null">
                    Continue shopping
                  </UiButton>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = {
    name: string;
    category: string;
    price: number;
    compareAt?: number;
    rating: number;
    reviews: number;
    description: string;
    colors: { name: string; hex: string }[];
    sizes: { label: string; inStock: boolean }[];
    images: { src: string; alt: string }[];
    highlights: string[];
    details: { title: string; content: string }[];
  };

  const props = withDefaults(
    defineProps<{
      product?: Product;
      /** How many units are available. Caps the quantity stepper. */
      stock?: number;
      breadcrumbs?: { label: string; link: string }[];
    }>(),
    {
      stock: 6,
      breadcrumbs: () => [
        { label: "Home", link: "#" },
        { label: "Outerwear", link: "#" },
        { label: "Bomber Jacket", link: "#" },
      ],
      product: () => ({
        name: "Bomber Jacket",
        category: "Outerwear",
        price: 138,
        compareAt: 168,
        rating: 4.6,
        reviews: 59,
        description:
          "A lightweight bomber in a soft, water repellent shell with ribbed trims and a zip sleeve pocket. Cut relaxed so it layers easily over knits.",
        colors: [
          { name: "Rust", hex: "#b4532a" },
          { name: "Olive", hex: "#4d5d3a" },
        ],
        sizes: [
          { label: "XS", inStock: false },
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "XL", inStock: false },
        ],
        images: [
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80",
            alt: "Rust bomber jacket on a hanger",
          },
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.22&fp-z=2.6",
            alt: "Ribbed collar and neck label",
          },
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80&crop=focalpoint&fp-x=0.78&fp-y=0.48&fp-z=2.6",
            alt: "Zip pocket on the sleeve",
          },
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80&crop=focalpoint&fp-x=0.4&fp-y=0.85&fp-z=2.4",
            alt: "Ribbed hem and hand pocket",
          },
        ],
        highlights: [
          "Water repellent recycled nylon shell",
          "Ribbed collar, cuffs and hem",
          "Zip sleeve pocket and two hand pockets",
          "Relaxed fit, true to size",
        ],
        details: [
          {
            title: "Materials and care",
            content:
              "Shell and lining are 100% recycled nylon. Machine wash cold on a gentle cycle and hang to dry. Do not tumble dry or iron.",
          },
          {
            title: "Fit",
            content:
              "Relaxed fit that sits at the hip. The model is 6 feet tall and wears a medium. Size down if you prefer a closer fit.",
          },
          {
            title: "Shipping and returns",
            content:
              "Free standard shipping on orders over $75, delivered in 2 to 4 business days. Returns are free for 30 days.",
          },
        ],
      }),
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const size = ref("");
  const quantity = ref(1);
  const cartCount = ref(2);
  const confirmation = ref<{ size: string; quantity: number } | null>(null);

  const subtotal = computed(() => props.product.price * quantity.value);

  // Replace this with a call to your cart store or API.
  function addToCart() {
    cartCount.value += quantity.value;
    confirmation.value = { size: size.value, quantity: quantity.value };
  }
</script>
