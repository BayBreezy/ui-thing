<template>
  <!--
    Order confirmation with a confetti burst
    Features: Animated success check with a short confetti burst that respects reduced motion, order number and email notice, item list with totals, delivery and payment details, a what happens next row and track order actions
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="relative mx-auto max-w-3xl text-center">
      <div class="pointer-events-none absolute top-8 left-1/2" aria-hidden="true">
        <Motion
          v-for="piece in pieces"
          :key="piece.id"
          class="absolute size-2 rounded-[2px]"
          :style="{ backgroundColor: piece.color }"
          :initial="{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }"
          :animate="{ x: piece.x, y: piece.y, opacity: 0, rotate: piece.rotate, scale: 0.5 }"
          :transition="{ duration: 1.7, ease: 'easeOut', delay: piece.delay }"
        />
      </div>

      <Motion
        class="mx-auto grid size-16 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
        :initial="{ scale: 0.5, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 18 }"
      >
        <Icon name="lucide:check" class="size-8" />
      </Motion>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        Thanks {{ order.firstName }}, your order is confirmed
      </h1>
      <p class="text-muted-foreground mt-3">
        Order <strong class="text-foreground">{{ order.id }}</strong
        >. We sent a receipt to {{ order.email }}.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <UiButton>
          <Icon name="lucide:package-search" />
          Track order
        </UiButton>
        <UiButton variant="outline">Continue shopping</UiButton>
      </div>
    </div>

    <div class="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-[1.2fr_1fr]">
      <UiCard>
        <UiCardContent class="space-y-5">
          <h2 class="font-semibold">Order summary</h2>
          <ul class="divide-y">
            <li
              v-for="item in order.items"
              :key="item.name"
              class="flex items-center gap-4 py-3 first:pt-0"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="bg-muted size-14 rounded-lg object-cover"
              />
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
          <dl class="space-y-2 border-t pt-4 text-sm">
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
            <h2 class="font-semibold">Delivery</h2>
            <p class="text-muted-foreground mt-2">{{ order.delivery.label }}</p>
            <p class="font-medium">{{ order.delivery.eta }}</p>
          </div>
          <div>
            <h2 class="font-semibold">Shipping address</h2>
            <p class="text-muted-foreground mt-2">{{ order.address }}</p>
          </div>
          <div>
            <h2 class="font-semibold">Payment</h2>
            <p class="text-muted-foreground mt-2">{{ order.payment }}</p>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <ol class="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3" aria-label="What happens next">
      <li v-for="(step, i) in steps" :key="step.title" class="flex gap-3 rounded-xl border p-4">
        <span
          class="grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold"
          :class="i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'"
        >
          <Icon v-if="i === 0" name="lucide:check" class="size-4" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <div>
          <p class="text-sm font-medium">{{ step.title }}</p>
          <p class="text-muted-foreground text-xs">{{ step.description }}</p>
        </div>
      </li>
    </ol>
  </UiContainer>
</template>

<script lang="ts" setup>
  type OrderItem = {
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  };

  type Order = {
    id: string;
    firstName: string;
    email: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    address: string;
    delivery: { label: string; eta: string };
    payment: string;
  };

  withDefaults(
    defineProps<{
      order?: Order;
      steps?: { title: string; description: string }[];
    }>(),
    {
      order: () => ({
        id: "AR-48213",
        firstName: "Sarah",
        email: "sarah.johnson@example.com",
        subtotal: 230,
        shipping: 0,
        tax: 18.4,
        total: 248.4,
        address: "Sarah Johnson, 123 Market Street, San Francisco CA 94103",
        delivery: { label: "Standard shipping", eta: "Arrives in 5 to 7 business days" },
        payment: "Visa ending in 4242",
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
      }),
      steps: () => [
        {
          title: "Order confirmed",
          description: "We have your order and a receipt is on its way.",
        },
        {
          title: "We pack it",
          description: "Most orders leave our studio within one business day.",
        },
        {
          title: "It ships",
          description: "You get an email with tracking as soon as it is on the move.",
        },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  type Piece = { id: number; x: number; y: number; rotate: number; delay: number; color: string };

  // The burst is generated after mount so server and client markup match, and it is skipped
  // for people who prefer reduced motion.
  const pieces = ref<Piece[]>([]);
  const reducedMotion = usePreferredReducedMotion();
  const colors = ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ec4899", "#8b5cf6"];

  onMounted(() => {
    if (reducedMotion.value === "reduce") return;
    pieces.value = Array.from({ length: 36 }, (_, id) => {
      const angle = (Math.PI * 2 * id) / 36 + Math.random() * 0.4;
      const distance = 120 + Math.random() * 160;
      return {
        id,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + 60,
        rotate: Math.random() * 720 - 360,
        delay: Math.random() * 0.15,
        color: colors[id % colors.length]!,
      };
    });
  });
</script>
