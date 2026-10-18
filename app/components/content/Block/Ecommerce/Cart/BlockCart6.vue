<template>
  <!--
    Cart with add to your order suggestions
    Features: Cart lines with quantity steppers, a sticky summary, and a row of suggested add ons that move into the cart with one click and update the totals instantly
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">Your cart</h1>

    <div class="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <div>
        <ul v-if="items.length" class="divide-y border-y">
          <li v-for="item in items" :key="item.id" class="flex gap-4 py-5">
            <img
              :src="item.image"
              :alt="item.name"
              class="bg-muted size-24 shrink-0 rounded-xl object-cover"
            />
            <div class="flex min-w-0 flex-1 flex-col justify-between">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="truncate font-medium">{{ item.name }}</p>
                  <p class="text-muted-foreground text-sm">{{ item.variant }}</p>
                </div>
                <p class="font-semibold tabular-nums">
                  {{ money.format(item.price * item.quantity) }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <UiNumberField v-model="item.quantity" :min="1" :max="10" class="w-28">
                  <UiNumberFieldDecrement />
                  <UiNumberFieldInput
                    class="text-center"
                    :aria-label="`Quantity of ${item.name}`"
                  />
                  <UiNumberFieldIncrement />
                </UiNumberField>
                <button
                  type="button"
                  class="text-muted-foreground hover:text-destructive text-xs underline underline-offset-4"
                  @click="remove(item.id)"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="text-muted-foreground rounded-xl border border-dashed py-12 text-center">
          Your cart is empty. Add something from the suggestions below.
        </p>

        <section v-if="available.length" class="mt-12" aria-labelledby="upsell-title">
          <h2 id="upsell-title" class="text-lg font-semibold">Add to your order</h2>
          <ul class="mt-4 grid gap-4 sm:grid-cols-3">
            <li
              v-for="product in available"
              :key="product.id"
              class="flex flex-col rounded-xl border p-3"
            >
              <div class="bg-muted overflow-hidden rounded-lg">
                <UiAspectRatio :ratio="1">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    loading="lazy"
                    class="size-full object-cover"
                  />
                </UiAspectRatio>
              </div>
              <p class="mt-3 text-sm font-medium">{{ product.name }}</p>
              <p class="text-muted-foreground text-xs">{{ money.format(product.price) }}</p>
              <UiButton variant="outline" size="sm" class="mt-3" @click="add(product)">
                <Icon name="lucide:plus" />
                Add
              </UiButton>
            </li>
          </ul>
        </section>
      </div>

      <aside class="lg:sticky lg:top-8 lg:self-start">
        <UiCard>
          <UiCardContent class="space-y-4">
            <h2 class="text-lg font-semibold">Summary</h2>
            <dl class="space-y-3 text-sm" aria-live="polite">
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Items ({{ count }})</dt>
                <dd class="tabular-nums">{{ money.format(subtotal) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Shipping</dt>
                <dd class="tabular-nums">{{ shipping === 0 ? "Free" : money.format(shipping) }}</dd>
              </div>
              <div class="flex justify-between border-t pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd class="tabular-nums">{{ money.format(subtotal + shipping) }}</dd>
              </div>
            </dl>
            <UiButton class="w-full" size="lg" :disabled="!items.length">Checkout</UiButton>
          </UiCardContent>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type CartItem = {
    id: number;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
    href: string;
  };

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
      items?: CartItem[];
      suggestions?: Product[];
      freeShippingAt?: number;
      shippingFee?: number;
    }>(),
    {
      freeShippingAt: 75,
      shippingFee: 8,
      items: () => [
        {
          id: 7,
          name: "Bomber Jacket",
          variant: "Rust · M",
          price: 138,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
          href: "#",
        },
        {
          id: 9,
          name: "Classic Tee",
          variant: "White · L",
          price: 32,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
          href: "#",
        },
        {
          id: 11,
          name: "Canvas Tote",
          variant: "Natural",
          price: 28,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
          href: "#",
        },
      ],
      suggestions: () => [
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

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const items = ref<CartItem[]>(props.items.map((item) => ({ ...item })));

  const available = computed(() =>
    props.suggestions.filter((product) => !items.value.some((item) => item.id === product.id))
  );
  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shipping = computed(() =>
    subtotal.value >= props.freeShippingAt || !items.value.length ? 0 : props.shippingFee
  );

  function add(product: Product) {
    items.value.push({
      id: product.id,
      name: product.name,
      variant: product.colors[0]?.name ?? product.category,
      price: product.price,
      quantity: 1,
      image: product.image,
      href: product.href,
    });
  }

  function remove(id: number) {
    items.value = items.value.filter((item) => item.id !== id);
  }
</script>
