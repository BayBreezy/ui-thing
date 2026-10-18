<template>
  <!--
    Order history as cards
    Features: Tabs that filter orders into all, in progress, delivered and returned or cancelled, cards with a placed on, total, ship to and order number header, product rows with buy again, status badge and track, invoice and return actions
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">Your orders</h1>
    <p class="text-muted-foreground mt-2">{{ orders.length }} orders placed in the last 6 months</p>

    <UiTabs v-model="tab" class="mt-8">
      <UiTabsList>
        <UiTabsTrigger v-for="t in tabs" :key="t.value" :value="t.value">
          {{ t.label }}
        </UiTabsTrigger>
      </UiTabsList>
    </UiTabs>

    <ul class="mt-6 space-y-6">
      <li v-for="order in visible" :key="order.id">
        <article class="overflow-hidden rounded-xl border">
          <header
            class="bg-muted/40 grid grid-cols-2 gap-4 border-b p-5 text-sm sm:grid-cols-[repeat(3,1fr)_auto]"
          >
            <div>
              <p class="text-muted-foreground text-xs tracking-wide uppercase">Order placed</p>
              <p class="mt-1 font-medium">{{ formatDate(order.placedOn) }}</p>
            </div>
            <div>
              <p class="text-muted-foreground text-xs tracking-wide uppercase">Total</p>
              <p class="mt-1 font-medium tabular-nums">{{ money.format(order.total) }}</p>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <p class="text-muted-foreground text-xs tracking-wide uppercase">Ship to</p>
              <p class="mt-1 truncate font-medium">{{ order.address.split(",")[0] }}</p>
            </div>
            <div class="sm:text-right">
              <p class="text-muted-foreground text-xs tracking-wide uppercase">Order</p>
              <p class="mt-1 font-medium">{{ order.id }}</p>
            </div>
          </header>

          <div class="p-5">
            <div class="flex items-center justify-between gap-3">
              <UiBadge variant="soft" :color="statuses[order.status].color" shape="pill" dot>
                {{ statuses[order.status].label }}
              </UiBadge>
              <p class="text-muted-foreground text-sm">{{ statuses[order.status].note }}</p>
            </div>

            <ul class="mt-4 divide-y">
              <li
                v-for="item in order.items"
                :key="item.name"
                class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="bg-muted size-16 rounded-lg object-cover"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">{{ item.name }}</p>
                  <p class="text-muted-foreground text-xs">
                    {{ item.variant }}, qty {{ item.quantity }}
                  </p>
                </div>
                <p class="hidden text-sm tabular-nums sm:block">
                  {{ money.format(item.price * item.quantity) }}
                </p>
                <UiButton
                  variant="outline"
                  size="sm"
                  :aria-label="`Buy ${item.name} again`"
                  @click="reordered.push(order.id + item.name)"
                >
                  <Icon
                    :name="
                      reordered.includes(order.id + item.name) ? 'lucide:check' : 'lucide:rotate-cw'
                    "
                  />
                  <span class="hidden sm:inline">
                    {{ reordered.includes(order.id + item.name) ? "Added" : "Buy again" }}
                  </span>
                </UiButton>
              </li>
            </ul>

            <div class="mt-5 flex flex-wrap gap-2 border-t pt-5">
              <UiButton v-if="order.status === 'shipped'" size="sm">
                <Icon name="lucide:package-search" />
                Track package
              </UiButton>
              <UiButton variant="outline" size="sm">
                <Icon name="lucide:file-text" />
                View invoice
              </UiButton>
              <UiButton v-if="order.status === 'delivered'" variant="ghost" size="sm">
                Return items
              </UiButton>
            </div>
          </div>
        </article>
      </li>
    </ul>

    <p
      v-if="!visible.length"
      class="text-muted-foreground mt-12 rounded-xl border border-dashed py-12 text-center"
    >
      Nothing here yet.
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "processing" | "shipped" | "delivered" | "returned" | "cancelled";

  type Order = {
    id: string;
    placedOn: string;
    status: Status;
    total: number;
    address: string;
    items: { name: string; variant: string; price: number; quantity: number; image: string }[];
  };

  const props = withDefaults(
    defineProps<{
      orders?: Order[];
    }>(),
    {
      orders: () => [
        {
          id: "AR-48213",
          placedOn: "2026-10-14",
          status: "shipped",
          total: 248.4,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Bomber Jacket",
              variant: "Rust · M",
              price: 138,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80",
            },
            {
              name: "Classic Tee",
              variant: "White · L",
              price: 32,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            },
            {
              name: "Canvas Tote",
              variant: "Natural",
              price: 28,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-47602",
          placedOn: "2026-09-28",
          status: "delivered",
          total: 122.48,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Crew Sweatshirt",
              variant: "White · M",
              price: 58,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80",
            },
            {
              name: "Stoneware Mug",
              variant: "White",
              price: 24,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-47011",
          placedOn: "2026-09-02",
          status: "delivered",
          total: 214.92,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Studio Over-Ear",
              variant: "Black",
              price: 199,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-46188",
          placedOn: "2026-08-11",
          status: "delivered",
          total: 81.44,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Soy Candle",
              variant: "Amber",
              price: 34,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-45530",
          placedOn: "2026-07-19",
          status: "returned",
          total: 118.8,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Corduroy Dress",
              variant: "Burgundy · S",
              price: 110,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-44921",
          placedOn: "2026-06-30",
          status: "cancelled",
          total: 128.52,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Trail Backpack",
              variant: "Olive",
              price: 119,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
      ],
    }
  );

  const statuses = {
    processing: { label: "Processing", color: "amber", note: "We are getting it ready" },
    shipped: { label: "Shipped", color: "blue", note: "Arriving Tue, Oct 20" },
    delivered: { label: "Delivered", color: "green", note: "Left at the front door" },
    returned: { label: "Returned", color: "slate", note: "Refund issued to your card" },
    cancelled: { label: "Cancelled", color: "red", note: "You were not charged" },
  } as const;

  const tabs = [
    { value: "all", label: "All orders" },
    { value: "progress", label: "In progress" },
    { value: "delivered", label: "Delivered" },
    { value: "closed", label: "Returned or cancelled" },
  ];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tab = ref("all");
  const reordered = ref<string[]>([]);

  const visible = computed(() =>
    props.orders.filter((order) => {
      if (tab.value === "progress")
        return order.status === "processing" || order.status === "shipped";
      if (tab.value === "delivered") return order.status === "delivered";
      if (tab.value === "closed")
        return order.status === "returned" || order.status === "cancelled";
      return true;
    })
  );

  function formatDate(value: string) {
    return dateFormat.format(new Date(`${value}T00:00:00`));
  }
</script>
