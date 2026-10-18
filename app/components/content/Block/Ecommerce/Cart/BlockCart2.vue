<template>
  <!--
    Shopping cart page with order summary
    Features: Line items with photo, variant, quantity field and line total, remove and save for later actions, a sticky order summary with shipping and estimated tax, accepted payment icons and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">Shopping cart</h1>
    <p class="text-muted-foreground mt-2">{{ count }} {{ count === 1 ? "item" : "items" }}</p>

    <div v-if="items.length" class="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
      <ul class="divide-y border-y">
        <li v-for="item in items" :key="item.id" class="flex gap-4 py-6 sm:gap-6">
          <a :href="item.href" class="shrink-0">
            <img
              :src="item.image"
              :alt="item.name"
              class="bg-muted size-24 rounded-xl object-cover sm:size-32"
            />
          </a>
          <div class="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row">
            <div class="min-w-0">
              <h2 class="font-medium">
                <a :href="item.href" class="hover:underline">{{ item.name }}</a>
              </h2>
              <p class="text-muted-foreground mt-1 text-sm">{{ item.variant }}</p>
              <p class="mt-2 text-sm font-medium tabular-nums">{{ money.format(item.price) }}</p>
              <div class="text-muted-foreground mt-3 flex gap-4 text-xs">
                <button type="button" class="hover:text-foreground underline underline-offset-4">
                  Save for later
                </button>
                <button
                  type="button"
                  class="hover:text-destructive underline underline-offset-4"
                  @click="remove(item.id)"
                >
                  Remove
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
              <UiNumberField v-model="item.quantity" :min="1" :max="10" class="w-28">
                <UiNumberFieldDecrement />
                <UiNumberFieldInput class="text-center" :aria-label="`Quantity of ${item.name}`" />
                <UiNumberFieldIncrement />
              </UiNumberField>
              <p class="font-semibold tabular-nums">
                {{ money.format(item.price * item.quantity) }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <aside class="lg:sticky lg:top-8 lg:self-start">
        <UiCard>
          <UiCardContent class="space-y-4">
            <h2 class="text-lg font-semibold">Order summary</h2>
            <dl class="space-y-3 text-sm" aria-live="polite">
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Subtotal</dt>
                <dd class="tabular-nums">{{ money.format(subtotal) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Shipping</dt>
                <dd class="tabular-nums">{{ shipping === 0 ? "Free" : money.format(shipping) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Estimated tax</dt>
                <dd class="tabular-nums">{{ money.format(tax) }}</dd>
              </div>
              <UiSeparator />
              <div class="flex justify-between text-base font-semibold">
                <dt>Total</dt>
                <dd class="tabular-nums">{{ money.format(total) }}</dd>
              </div>
            </dl>
            <UiButton class="w-full" size="lg">Continue to checkout</UiButton>
            <div class="text-muted-foreground flex items-center justify-center gap-3 text-xs">
              <Icon name="lucide:lock" class="size-3.5" />
              Secure checkout
              <span class="flex items-center gap-1.5" aria-hidden="true">
                <Icon name="logos:visa" class="h-3 w-auto" />
                <Icon name="logos:mastercard" class="size-5" />
                <Icon name="logos:paypal" class="size-4" />
              </span>
            </div>
          </UiCardContent>
        </UiCard>
        <p class="text-muted-foreground mt-4 text-center text-xs">
          Free shipping on orders over {{ money.format(freeShippingAt) }}. Free returns for 30 days.
        </p>
      </aside>
    </div>

    <UiEmpty v-else class="mt-10 border border-dashed">
      <UiEmptyHeader>
        <UiEmptyMedia>
          <UiFancyIcon icon="lucide:shopping-bag" theme="modern-neue" />
        </UiEmptyMedia>
        <UiEmptyTitle>Your cart is empty</UiEmptyTitle>
        <UiEmptyDescription>Find something you love and it will show up here.</UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton>Continue shopping</UiButton>
      </UiEmptyContent>
    </UiEmpty>
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

  const props = withDefaults(
    defineProps<{
      items?: CartItem[];
      /** Orders at or above this subtotal ship for free. */
      freeShippingAt?: number;
      shippingFee?: number;
      /** Estimated tax as a fraction, for example 0.08 for 8%. */
      taxRate?: number;
    }>(),
    {
      freeShippingAt: 75,
      shippingFee: 8,
      taxRate: 0.08,
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
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const items = ref<CartItem[]>(props.items.map((item) => ({ ...item })));

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shipping = computed(() => (subtotal.value >= props.freeShippingAt ? 0 : props.shippingFee));
  const tax = computed(() => subtotal.value * props.taxRate);
  const total = computed(() => subtotal.value + shipping.value + tax.value);

  function remove(id: number) {
    items.value = items.value.filter((item) => item.id !== id);
  }
</script>
