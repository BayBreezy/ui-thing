<template>
  <!--
    Two column checkout with a collapsible mobile summary
    Features: Compact form beside a shaded order summary panel on large screens, on phones the summary collapses behind a total bar at the top, express buttons, validated contact, address and card fields and a pay button
  -->
  <UiContainer class="py-8 lg:py-16">
    <div v-if="!paid" class="overflow-hidden rounded-2xl border lg:grid lg:grid-cols-[1fr_28rem]">
      <UiCollapsible v-model:open="summaryOpen" class="bg-muted/40 border-b lg:hidden">
        <UiCollapsibleTrigger as-child>
          <button
            type="button"
            class="flex w-full items-center justify-between gap-3 px-5 py-4 text-sm"
            :aria-expanded="summaryOpen"
          >
            <span class="flex items-center gap-2 font-medium">
              <Icon name="lucide:shopping-bag" class="size-4" />
              {{ summaryOpen ? "Hide" : "Show" }} order summary
              <Icon
                name="lucide:chevron-down"
                class="size-4 transition"
                :class="summaryOpen ? 'rotate-180' : ''"
              />
            </span>
            <span class="font-semibold tabular-nums">{{ money.format(total) }}</span>
          </button>
        </UiCollapsibleTrigger>
        <UiCollapsibleContent class="px-5 pb-5">
          <div class="space-y-5">
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
          </div>
        </UiCollapsibleContent>
      </UiCollapsible>

      <div class="p-6 sm:p-10">
        <div>
          <p
            class="text-muted-foreground mb-3 text-center text-xs font-medium tracking-wide uppercase"
          >
            Express checkout
          </p>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex h-11 items-center justify-center rounded-lg border bg-white text-black transition hover:opacity-90"
              aria-label="Pay with Apple Pay"
            >
              <Icon name="logos:apple-pay" class="h-5 w-auto" />
            </button>
            <button
              type="button"
              class="flex h-11 items-center justify-center rounded-lg bg-[#ffc439] text-black transition hover:opacity-90"
              aria-label="Pay with PayPal"
            >
              <Icon name="logos:paypal" class="h-5 w-auto" />
            </button>
          </div>
          <div class="my-6 flex items-center gap-4">
            <UiSeparator class="flex-1" />
            <span class="text-muted-foreground text-xs">or</span>
            <UiSeparator class="flex-1" />
          </div>
        </div>

        <form class="space-y-8" novalidate @submit.prevent="submit">
          <section class="space-y-4" aria-labelledby="c8-contact">
            <h2 id="c8-contact" class="font-semibold">Contact</h2>
            <UiVeeInput
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </section>

          <section class="space-y-4" aria-labelledby="c8-ship">
            <h2 id="c8-ship" class="font-semibold">Delivery</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <UiVeeInput name="firstName" label="First name" autocomplete="given-name" />
              <UiVeeInput name="lastName" label="Last name" autocomplete="family-name" />
            </div>
            <UiVeeInput name="address" label="Address" autocomplete="address-line1" />
            <div class="grid gap-4 sm:grid-cols-2">
              <UiVeeInput name="city" label="City" autocomplete="address-level2" />
              <UiVeeInput
                name="zip"
                label="ZIP code"
                autocomplete="postal-code"
                inputmode="numeric"
              />
            </div>
          </section>

          <section class="space-y-4" aria-labelledby="c8-pay">
            <h2 id="c8-pay" class="font-semibold">Payment</h2>
            <UiVeeInput
              v-maska="'#### #### #### ####'"
              name="cardNumber"
              label="Card number"
              placeholder="4242 4242 4242 4242"
              autocomplete="cc-number"
              inputmode="numeric"
              hint="Demo only. Try 4242 4242 4242 4242."
            />
            <div class="grid gap-4 sm:grid-cols-2">
              <UiVeeInput
                v-maska="'##/##'"
                name="expiry"
                label="Expiry date"
                placeholder="MM/YY"
                autocomplete="cc-exp"
                inputmode="numeric"
              />
              <UiVeeInput
                v-maska="'####'"
                name="cvc"
                label="Security code"
                placeholder="123"
                autocomplete="cc-csc"
                inputmode="numeric"
              />
            </div>
          </section>

          <UiButton type="submit" size="lg" class="w-full" :loading="isSubmitting">
            Pay {{ money.format(total) }}
          </UiButton>
        </form>
      </div>

      <aside class="bg-muted/40 hidden border-l p-10 lg:block">
        <div class="sticky top-8">
          <div class="space-y-5">
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
          </div>
        </div>
      </aside>
    </div>

    <div v-else class="mx-auto max-w-lg py-12 text-center" role="status">
      <span
        class="mx-auto grid size-14 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
      >
        <Icon name="lucide:check" class="size-7" />
      </span>
      <h1 class="mt-6 text-3xl font-bold tracking-tight">Thank you for your order</h1>
      <p class="text-muted-foreground mt-3">
        We emailed your receipt and will let you know when it ships.
      </p>
      <UiButton class="mt-8" variant="outline" @click="paid = false">Back to checkout</UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

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
      shippingFee?: number;
      freeShippingAt?: number;
      taxRate?: number;
    }>(),
    {
      shippingFee: 8,
      freeShippingAt: 75,
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

  const summaryOpen = ref(false);
  const paid = ref(false);

  const subtotal = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shippingCost = computed(() =>
    subtotal.value >= props.freeShippingAt ? 0 : props.shippingFee
  );
  const tax = computed(() => subtotal.value * props.taxRate);
  const total = computed(() => subtotal.value + shippingCost.value + tax.value);

  // Demo validation only. For real payments use your provider's hosted card fields.
  function passesLuhn(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 13) return false;
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = Number(digits[digits.length - 1 - i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  function isFutureExpiry(value: string) {
    const match = /^(\d{2})\/(\d{2})$/.exec(value);
    if (!match) return false;
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    if (month < 1 || month > 12) return false;
    return new Date(year, month, 0, 23, 59, 59) >= new Date();
  }

  const schema = object({
    email: string().email("Enter a valid email address").required().label("Email"),
    firstName: string().required().label("First name"),
    lastName: string().required().label("Last name"),
    address: string().required().label("Address"),
    city: string().required().label("City"),
    zip: string()
      .matches(/^\d{5}$/, "Enter a 5 digit ZIP code")
      .required()
      .label("ZIP code"),
    cardNumber: string()
      .required()
      .test("luhn", "Enter a valid card number", (value) => passesLuhn(value ?? ""))
      .label("Card number"),
    expiry: string()
      .required()
      .test("expiry", "Enter a valid expiry date", (value) => isFutureExpiry(value ?? ""))
      .label("Expiry date"),
    cvc: string()
      .matches(/^\d{3,4}$/, "Enter 3 or 4 digits")
      .required()
      .label("Security code"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  // Replace the timeout with a request to your payment provider.
  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    paid.value = true;
  });
</script>
