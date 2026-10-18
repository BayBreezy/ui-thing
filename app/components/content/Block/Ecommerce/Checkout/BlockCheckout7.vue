<template>
  <!--
    Order review before placing the order
    Features: Recap of contact, delivery address, shipping method and payment with edit buttons that emit an event, item list with totals, a required terms checkbox validated with vee-validate and a place order button that confirms the order
  -->
  <UiContainer class="py-12 lg:py-20">
    <div v-if="!placed" class="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Review your order</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Check everything below, then place your order.
        </p>

        <dl class="mt-8 divide-y rounded-xl border">
          <div v-for="row in rows" :key="row.key" class="flex items-start gap-4 p-5">
            <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-full">
              <Icon :name="row.icon" class="size-5" />
            </span>
            <div class="min-w-0 flex-1">
              <dt class="text-muted-foreground text-xs tracking-wide uppercase">{{ row.label }}</dt>
              <dd class="mt-1 text-sm font-medium">{{ row.value }}</dd>
              <dd v-if="row.detail" class="text-muted-foreground text-sm">{{ row.detail }}</dd>
            </div>
            <UiButton variant="ghost" size="sm" @click="emit('edit', row.key)">Edit</UiButton>
          </div>
        </dl>

        <form class="mt-8 space-y-6" novalidate @submit.prevent="submit">
          <UiVeeCheckbox name="terms" label="I agree to the terms of sale and the returns policy" />
          <UiButton type="submit" size="lg" class="w-full" :loading="isSubmitting">
            Place order · {{ money.format(total) }}
          </UiButton>
          <p class="text-muted-foreground flex items-center justify-center gap-2 text-xs">
            <Icon name="lucide:lock" class="size-3.5" />
            Your payment is processed securely.
          </p>
        </form>
      </div>

      <aside class="lg:sticky lg:top-8 lg:self-start">
        <UiCard>
          <UiCardContent class="space-y-5">
            <h2 class="text-lg font-semibold">Order summary</h2>
            <ul class="divide-y">
              <li
                v-for="item in items"
                :key="item.id"
                class="flex items-center gap-4 py-4 first:pt-0"
              >
                <div class="relative shrink-0">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="bg-muted size-16 rounded-lg object-cover"
                  />
                  <span
                    class="bg-foreground text-background absolute -top-2 -right-2 grid size-5 place-items-center rounded-full text-xs font-medium"
                    aria-hidden="true"
                  >
                    {{ item.quantity }}
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">{{ item.name }}</p>
                  <p class="text-muted-foreground text-xs">
                    {{ item.variant }}, qty {{ item.quantity }}
                  </p>
                </div>
                <p class="text-sm font-medium tabular-nums">
                  {{ money.format(item.price * item.quantity) }}
                </p>
              </li>
            </ul>
            <dl class="space-y-2 border-t pt-4 text-sm" aria-live="polite">
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Subtotal</dt>
                <dd class="tabular-nums">{{ money.format(subtotal) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Shipping</dt>
                <dd class="tabular-nums">
                  {{ shippingCost === 0 ? "Free" : money.format(shippingCost) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Estimated tax</dt>
                <dd class="tabular-nums">{{ money.format(tax) }}</dd>
              </div>
              <div class="flex justify-between border-t pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd class="tabular-nums">{{ money.format(total) }}</dd>
              </div>
            </dl>
          </UiCardContent>
        </UiCard>
      </aside>
    </div>

    <div v-else class="mx-auto max-w-lg text-center" role="status">
      <span
        class="mx-auto grid size-14 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
      >
        <Icon name="lucide:check" class="size-7" />
      </span>
      <h1 class="mt-6 text-3xl font-bold tracking-tight">Order placed</h1>
      <p class="text-muted-foreground mt-3">
        Order <strong class="text-foreground">AR-48213</strong> is confirmed. A receipt is on its
        way to {{ order.email }}.
      </p>
      <UiButton class="mt-8" variant="outline" @click="placed = false">Back to review</UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { boolean, object } from "yup";

  type CartItem = {
    id: number;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
    href: string;
  };

  type Order = {
    email: string;
    name: string;
    address: string;
    shipping: { label: string; eta: string; price: number };
    payment: { brand: string; last4: string };
  };

  const props = withDefaults(
    defineProps<{
      items?: CartItem[];
      order?: Order;
      taxRate?: number;
    }>(),
    {
      taxRate: 0.08,
      order: () => ({
        email: "sarah.johnson@example.com",
        name: "Sarah Johnson",
        address: "123 Market Street, San Francisco CA 94103",
        shipping: { label: "Express", eta: "Arrives in 2 to 3 business days", price: 15 },
        payment: { brand: "Visa", last4: "4242" },
      }),
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

  const emit = defineEmits<{
    /** Fired with `contact`, `address`, `shipping` or `payment` when an Edit button is clicked. */
    edit: [section: "contact" | "address" | "shipping" | "payment"];
  }>();

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const placed = ref(false);

  const rows = computed(() => [
    { key: "contact" as const, icon: "lucide:mail", label: "Contact", value: props.order.email },
    {
      key: "address" as const,
      icon: "lucide:map-pin",
      label: "Ship to",
      value: props.order.name,
      detail: props.order.address,
    },
    {
      key: "shipping" as const,
      icon: "lucide:truck",
      label: "Delivery",
      value: `${props.order.shipping.label}, ${money.format(props.order.shipping.price)}`,
      detail: props.order.shipping.eta,
    },
    {
      key: "payment" as const,
      icon: "lucide:credit-card",
      label: "Payment",
      value: `${props.order.payment.brand} ending in ${props.order.payment.last4}`,
    },
  ]);

  const subtotal = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shippingCost = computed(() => props.order.shipping.price);
  const tax = computed(() => subtotal.value * props.taxRate);
  const total = computed(() => subtotal.value + shippingCost.value + tax.value);

  const schema = object({
    terms: boolean()
      .required("Please accept the terms to place your order")
      .oneOf([true], "Please accept the terms to place your order"),
  });

  const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema });

  // Replace the timeout with a request that creates the order.
  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    placed.value = true;
  });
</script>
