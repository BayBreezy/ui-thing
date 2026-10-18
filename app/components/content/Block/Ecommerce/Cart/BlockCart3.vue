<template>
  <!--
    Cart with free shipping progress and promo code
    Features: Progress bar that counts down to free shipping, promo code field with apply and remove and an inline error for invalid codes, discount line in the totals and a sticky checkout button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl font-bold tracking-tight">Your cart</h1>

      <div class="mt-6 rounded-xl border p-4">
        <p class="text-sm" role="status" aria-live="polite">
          <template v-if="remaining > 0">
            You are <strong>{{ money.format(remaining) }}</strong> away from free shipping.
          </template>
          <template v-else>
            <Icon name="lucide:party-popper" class="mr-1 inline size-4" />
            You have unlocked <strong>free shipping</strong>.
          </template>
        </p>
        <UiProgress :model-value="progress" class="mt-3 h-2" />
      </div>

      <ul class="mt-6 divide-y">
        <li v-for="item in items" :key="item.id" class="flex items-center gap-4 py-5">
          <img
            :src="item.image"
            :alt="item.name"
            class="bg-muted size-20 shrink-0 rounded-lg object-cover"
          />
          <div class="min-w-0 flex-1">
            <p class="truncate font-medium">{{ item.name }}</p>
            <p class="text-muted-foreground text-sm">{{ item.variant }}</p>
            <div class="mt-2 flex items-center gap-3">
              <UiNumberField v-model="item.quantity" :min="1" :max="10" class="w-28">
                <UiNumberFieldDecrement />
                <UiNumberFieldInput class="text-center" :aria-label="`Quantity of ${item.name}`" />
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
          <p class="font-semibold tabular-nums">{{ money.format(item.price * item.quantity) }}</p>
        </li>
      </ul>

      <div class="mt-6 border-t pt-6">
        <form class="flex gap-2" novalidate @submit.prevent="applyCode">
          <div class="flex-1">
            <UiLabel for="promo" class="sr-only">Promo code</UiLabel>
            <UiInput
              id="promo"
              v-model="code"
              placeholder="Promo code"
              autocomplete="off"
              :disabled="!!applied"
              :aria-invalid="!!error"
              :aria-describedby="error ? 'promo-error' : undefined"
            />
          </div>
          <UiButton v-if="!applied" type="submit" variant="outline" :disabled="!code.trim()">
            Apply
          </UiButton>
        </form>
        <p v-if="error" id="promo-error" class="text-destructive mt-2 text-sm" role="alert">
          {{ error }}
        </p>
        <UiBadge v-if="applied" variant="soft" color="green" size="md" class="mt-3 gap-2">
          <Icon name="lucide:tag" />
          {{ applied.code }} · {{ applied.percent }}% off
          <button type="button" aria-label="Remove promo code" @click="removeCode">
            <Icon name="lucide:x" />
          </button>
        </UiBadge>
        <p v-else class="text-muted-foreground mt-2 text-xs">
          Try <strong>AUTUMN10</strong> or <strong>WELCOME15</strong>.
        </p>
      </div>

      <dl class="mt-6 space-y-3 border-t pt-6 text-sm" aria-live="polite">
        <div class="flex justify-between">
          <dt class="text-muted-foreground">Subtotal</dt>
          <dd class="tabular-nums">{{ money.format(subtotal) }}</dd>
        </div>
        <div v-if="discount" class="flex justify-between text-green-600 dark:text-green-400">
          <dt>Discount ({{ applied?.code }})</dt>
          <dd class="tabular-nums">-{{ money.format(discount) }}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-muted-foreground">Shipping</dt>
          <dd class="tabular-nums">{{ shipping === 0 ? "Free" : money.format(shipping) }}</dd>
        </div>
        <div class="flex justify-between border-t pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd class="tabular-nums">{{ money.format(total) }}</dd>
        </div>
      </dl>

      <UiButton class="mt-6 w-full" size="lg"> Checkout · {{ money.format(total) }} </UiButton>
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

  const props = withDefaults(
    defineProps<{
      items?: CartItem[];
      freeShippingAt?: number;
      shippingFee?: number;
      /** Valid codes mapped to the percentage they take off. Validate on your server too. */
      promoCodes?: Record<string, number>;
    }>(),
    {
      freeShippingAt: 250,
      shippingFee: 8,
      promoCodes: () => ({ AUTUMN10: 10, WELCOME15: 15 }),
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
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const items = ref<CartItem[]>(props.items.map((item) => ({ ...item })));
  const code = ref("");
  const error = ref("");
  const applied = ref<{ code: string; percent: number } | null>(null);

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const discount = computed(() =>
    applied.value ? (subtotal.value * applied.value.percent) / 100 : 0
  );
  const remaining = computed(() =>
    Math.max(0, props.freeShippingAt - (subtotal.value - discount.value))
  );
  const progress = computed(() =>
    Math.min(100, ((subtotal.value - discount.value) / props.freeShippingAt) * 100)
  );
  const shipping = computed(() => (remaining.value === 0 ? 0 : props.shippingFee));
  const total = computed(() => subtotal.value - discount.value + shipping.value);

  function applyCode() {
    const value = code.value.trim().toUpperCase();
    const percent = props.promoCodes[value];
    if (!percent) {
      error.value = "That code is not valid or has expired.";
      return;
    }
    error.value = "";
    applied.value = { code: value, percent };
    code.value = value;
  }

  function removeCode() {
    applied.value = null;
    code.value = "";
  }

  function remove(id: number) {
    items.value = items.value.filter((item) => item.id !== id);
  }
</script>
