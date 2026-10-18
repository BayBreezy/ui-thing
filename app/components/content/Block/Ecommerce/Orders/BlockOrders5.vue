<template>
  <!--
    Order detail page
    Features: Breadcrumbs, order number with status badge and delivery progress bar, line items with prices, a totals card, shipping address, billing and payment details and download invoice and support actions
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiBreadcrumbs
      :items="[
        { label: 'Account', link: '#' },
        { label: 'Orders', link: '#' },
        { label: order.id, link: '#' },
      ]"
      class="mb-8"
    />

    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">Order {{ order.id }}</h1>
          <UiBadge variant="soft" color="blue" shape="pill" dot>{{ order.statusLabel }}</UiBadge>
        </div>
        <p class="text-muted-foreground mt-2 text-sm">Placed on {{ order.placedOn }}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <UiButton variant="outline">
          <Icon name="lucide:download" />
          Download invoice
        </UiButton>
        <UiButton variant="ghost">
          <Icon name="lucide:life-buoy" />
          Need help?
        </UiButton>
      </div>
    </div>

    <div class="mt-8 rounded-xl border p-5">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium">{{ order.progress.label }}</span>
        <span class="text-muted-foreground">Arriving {{ order.progress.eta }}</span>
      </div>
      <UiProgress :model-value="order.progress.percent" class="mt-3 h-2" />
      <ol class="text-muted-foreground mt-3 grid grid-cols-4 text-xs" aria-label="Delivery stages">
        <li
          v-for="(stage, i) in stages"
          :key="stage"
          :class="i === 0 ? '' : i === 3 ? 'text-right' : 'text-center'"
        >
          {{ stage }}
        </li>
      </ol>
    </div>

    <div class="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
      <section aria-labelledby="items-title">
        <h2 id="items-title" class="font-semibold">Items ({{ itemCount }})</h2>
        <ul class="mt-4 divide-y border-y">
          <li v-for="item in order.items" :key="item.name" class="flex gap-4 py-5">
            <img
              :src="item.image"
              :alt="item.name"
              class="bg-muted size-24 rounded-xl object-cover"
            />
            <div class="flex min-w-0 flex-1 flex-col justify-between">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-muted-foreground text-sm">{{ item.variant }}</p>
                </div>
                <p class="font-semibold tabular-nums">
                  {{ money.format(item.price * item.quantity) }}
                </p>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">
                  {{ money.format(item.price) }} × {{ item.quantity }}
                </span>
                <a href="#" class="underline underline-offset-4">Buy again</a>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <aside class="space-y-6">
        <UiCard>
          <UiCardContent class="space-y-3 text-sm">
            <h2 class="font-semibold">Order total</h2>
            <dl class="space-y-2">
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Subtotal</dt>
                <dd class="tabular-nums">{{ money.format(order.subtotal) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Shipping</dt>
                <dd class="tabular-nums">
                  {{ order.shipping === 0 ? "Free" : money.format(order.shipping) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Tax</dt>
                <dd class="tabular-nums">{{ money.format(order.tax) }}</dd>
              </div>
              <div class="flex justify-between border-t pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd class="tabular-nums">{{ money.format(order.total) }}</dd>
              </div>
            </dl>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardContent class="space-y-5 text-sm">
            <div>
              <h2 class="font-semibold">Shipping address</h2>
              <address class="text-muted-foreground mt-2 leading-relaxed not-italic">
                {{ order.name }}<br />
                {{ order.address }}
              </address>
            </div>
            <div>
              <h2 class="font-semibold">Delivery method</h2>
              <p class="text-muted-foreground mt-2">{{ order.delivery }}</p>
            </div>
            <div>
              <h2 class="font-semibold">Payment</h2>
              <p class="text-muted-foreground mt-2 flex items-center gap-2">
                <Icon name="lucide:credit-card" class="size-4" />
                {{ order.payment }}
              </p>
            </div>
          </UiCardContent>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Detail = {
    id: string;
    statusLabel: string;
    placedOn: string;
    name: string;
    address: string;
    delivery: string;
    payment: string;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    progress: { label: string; eta: string; percent: number };
    items: { name: string; variant: string; price: number; quantity: number; image: string }[];
  };

  const props = withDefaults(
    defineProps<{
      order?: Detail;
      stages?: string[];
    }>(),
    {
      stages: () => ["Placed", "Packed", "Shipped", "Delivered"],
      order: () => ({
        id: "AR-48213",
        statusLabel: "Shipped",
        placedOn: "October 14, 2026",
        name: "Sarah Johnson",
        address: "123 Market Street, San Francisco CA 94103",
        delivery: "Standard shipping, 5 to 7 business days",
        payment: "Visa ending in 4242",
        subtotal: 230,
        shipping: 0,
        tax: 18.4,
        total: 248.4,
        progress: { label: "On its way", eta: "Tue, Oct 20", percent: 62 },
        items: [
          {
            name: "Bomber Jacket",
            variant: "Rust · M",
            price: 138,
            quantity: 1,
            image:
              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Classic Tee",
            variant: "White · L",
            price: 32,
            quantity: 2,
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Canvas Tote",
            variant: "Natural",
            price: 28,
            quantity: 1,
            image:
              "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80",
          },
        ],
      }),
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const itemCount = computed(() => props.order.items.reduce((sum, item) => sum + item.quantity, 0));
</script>
