<template>
  <!--
    Delivery method step with radio cards
    Features: Address recap with a change link, delivery cards with an icon, live estimated arrival dates and price, free shipping threshold, a gift wrap switch and an order summary that updates with the choice
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
      <div>
        <div class="bg-muted/40 divide-y rounded-xl border text-sm">
          <div class="flex items-center justify-between gap-4 p-4">
            <span class="text-muted-foreground w-16 shrink-0">Contact</span>
            <span class="min-w-0 flex-1 truncate">{{ contact }}</span>
            <button type="button" class="underline underline-offset-4">Change</button>
          </div>
          <div class="flex items-center justify-between gap-4 p-4">
            <span class="text-muted-foreground w-16 shrink-0">Ship to</span>
            <span class="min-w-0 flex-1 truncate">{{ address }}</span>
            <button type="button" class="underline underline-offset-4">Change</button>
          </div>
        </div>

        <h1 class="mt-10 text-2xl font-bold tracking-tight">Delivery method</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Free standard shipping on orders over {{ money.format(freeOver) }}.
        </p>

        <UiRadioGroup v-model="selected" class="mt-6 grid gap-3" aria-label="Delivery method">
          <label
            v-for="option in options"
            :key="option.value"
            :for="`method-${option.value}`"
            class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition sm:p-5"
          >
            <UiRadioGroupItem :id="`method-${option.value}`" :value="option.value" />
            <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-full">
              <Icon :name="option.icon" class="size-5" />
            </span>
            <span class="flex-1">
              <span class="block font-medium">{{ option.label }}</span>
              <span class="text-muted-foreground block text-sm">{{ eta(option) }}</span>
            </span>
            <span class="font-semibold tabular-nums">
              {{ priceFor(option) === 0 ? "Free" : money.format(priceFor(option)) }}
            </span>
          </label>
        </UiRadioGroup>

        <div class="mt-6 flex items-center justify-between gap-4 rounded-xl border p-4">
          <div class="flex items-center gap-3">
            <Icon name="lucide:gift" class="size-5" />
            <div>
              <UiLabel for="gift-wrap" class="cursor-pointer">Add gift wrap</UiLabel>
              <p class="text-muted-foreground text-xs">
                Recycled paper and a handwritten note, {{ money.format(giftWrapPrice) }}.
              </p>
            </div>
          </div>
          <UiSwitch id="gift-wrap" v-model="giftWrap" />
        </div>

        <div class="mt-8 flex items-center justify-between gap-3">
          <UiButton variant="ghost">
            <Icon name="lucide:arrow-left" />
            Back to information
          </UiButton>
          <UiButton size="lg">Continue to payment</UiButton>
        </div>
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

  type Option = {
    value: string;
    label: string;
    icon: string;
    price: number;
    /** Business days to arrive, earliest and latest. */
    days: [number, number];
    freeOver?: number;
  };

  const props = withDefaults(
    defineProps<{
      items?: CartItem[];
      contact?: string;
      address?: string;
      taxRate?: number;
      giftWrapPrice?: number;
      options?: Option[];
    }>(),
    {
      contact: "sarah.johnson@example.com",
      address: "123 Market Street, San Francisco CA 94103",
      taxRate: 0.08,
      giftWrapPrice: 5,
      options: () => [
        {
          value: "standard",
          label: "Standard",
          icon: "lucide:package",
          price: 8,
          days: [5, 7],
          freeOver: 75,
        },
        { value: "express", label: "Express", icon: "lucide:truck", price: 15, days: [2, 3] },
        { value: "overnight", label: "Next day", icon: "lucide:zap", price: 25, days: [1, 1] },
      ],
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
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const selected = ref("standard");
  const giftWrap = ref(false);
  // Dates are worked out after mount so server and client markup match.
  const mounted = ref(false);
  onMounted(() => (mounted.value = true));

  const freeOver = computed(() => props.options.find((o) => o.freeOver)?.freeOver ?? 0);
  const subtotal = computed(
    () =>
      props.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      (giftWrap.value ? props.giftWrapPrice : 0)
  );

  function priceFor(option: Option) {
    return option.freeOver && subtotal.value >= option.freeOver ? 0 : option.price;
  }

  function addBusinessDays(days: number) {
    const date = new Date();
    let added = 0;
    while (added < days) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) added++;
    }
    return date;
  }

  function eta(option: Option) {
    const [min, max] = option.days;
    if (!mounted.value) return min === max ? "Next business day" : `${min} to ${max} business days`;
    return min === max
      ? `Arrives ${dateFormat.format(addBusinessDays(min))}`
      : `Arrives ${dateFormat.format(addBusinessDays(min))} to ${dateFormat.format(addBusinessDays(max))}`;
  }

  const shippingCost = computed(() => {
    const option = props.options.find((o) => o.value === selected.value);
    return option ? priceFor(option) : 0;
  });
  const tax = computed(() => subtotal.value * props.taxRate);
  const total = computed(() => subtotal.value + shippingCost.value + tax.value);
</script>
