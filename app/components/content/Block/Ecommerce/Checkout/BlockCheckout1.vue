<template>
  <!--
    Single page checkout with order summary
    Features: Contact, shipping address, delivery method and card payment on one page, yup validation with inline errors, masked card fields, delivery cards that update the total, a sticky order summary and a confirmation after paying
  -->
  <UiContainer class="py-12 lg:py-20">
    <div v-if="!placed" class="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
      <form class="space-y-10" novalidate @submit.prevent="submit">
        <section aria-labelledby="contact-title">
          <h2 id="contact-title" class="text-lg font-semibold">Contact</h2>
          <div class="mt-4 space-y-4">
            <UiVeeInput
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
            />
            <UiVeeCheckbox name="news" label="Email me about new arrivals and offers" />
          </div>
        </section>

        <section aria-labelledby="shipping-title">
          <h2 id="shipping-title" class="text-lg font-semibold">Shipping address</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <UiVeeInput name="firstName" label="First name" autocomplete="given-name" />
            <UiVeeInput name="lastName" label="Last name" autocomplete="family-name" />
            <div class="sm:col-span-2">
              <UiVeeInput
                name="address"
                label="Address"
                placeholder="123 Market Street"
                autocomplete="address-line1"
              />
            </div>
            <UiVeeInput name="city" label="City" autocomplete="address-level2" />
            <UiVeeSelect name="state" label="State">
              <option value="" disabled>Select a state</option>
              <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
            </UiVeeSelect>
            <UiVeeInput
              name="zip"
              label="ZIP code"
              placeholder="94103"
              autocomplete="postal-code"
              inputmode="numeric"
            />
          </div>
        </section>

        <section aria-labelledby="delivery-title">
          <h2 id="delivery-title" class="text-lg font-semibold">Delivery</h2>
          <UiRadioGroup v-model="delivery" class="mt-4 grid gap-3" aria-label="Delivery method">
            <label
              v-for="option in deliveryOptions"
              :key="option.value"
              :for="`delivery-${option.value}`"
              class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition"
            >
              <UiRadioGroupItem :id="`delivery-${option.value}`" :value="option.value" />
              <span class="flex-1">
                <span class="block text-sm font-medium">{{ option.label }}</span>
                <span class="text-muted-foreground block text-xs">{{ option.eta }}</span>
              </span>
              <span class="text-sm font-medium tabular-nums">
                {{ priceFor(option) === 0 ? "Free" : money.format(priceFor(option)) }}
              </span>
            </label>
          </UiRadioGroup>
        </section>

        <section aria-labelledby="payment-title">
          <div class="flex items-center justify-between">
            <h2 id="payment-title" class="text-lg font-semibold">Payment</h2>
            <span class="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Icon name="lucide:lock" class="size-3.5" />
              Encrypted
            </span>
          </div>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <UiVeeInput
                v-maska="'#### #### #### ####'"
                name="cardNumber"
                label="Card number"
                placeholder="4242 4242 4242 4242"
                autocomplete="cc-number"
                inputmode="numeric"
                hint="Demo only. Try 4242 4242 4242 4242."
              />
            </div>
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
      <h1 class="mt-6 text-3xl font-bold tracking-tight">Thank you, {{ firstName }}!</h1>
      <p class="text-muted-foreground mt-3">
        Order <strong class="text-foreground">AR-48213</strong> is confirmed. We sent a receipt to
        {{ email }}.
      </p>
      <UiButton class="mt-8" @click="placed = false">Continue shopping</UiButton>
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

  type DeliveryOption = {
    value: string;
    label: string;
    eta: string;
    price: number;
    /** Orders at or above this subtotal ship free with this option. */
    freeOver?: number;
  };

  const props = withDefaults(
    defineProps<{
      items?: CartItem[];
      /** Estimated tax as a fraction, for example 0.08 for 8%. */
      taxRate?: number;
      deliveryOptions?: DeliveryOption[];
    }>(),
    {
      taxRate: 0.08,
      deliveryOptions: () => [
        {
          value: "standard",
          label: "Standard",
          eta: "5 to 7 business days",
          price: 8,
          freeOver: 75,
        },
        { value: "express", label: "Express", eta: "2 to 3 business days", price: 15 },
        { value: "overnight", label: "Next day", eta: "Order before 2 pm", price: 25 },
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

  const states = [
    "California",
    "Colorado",
    "Florida",
    "Illinois",
    "Massachusetts",
    "New York",
    "Texas",
    "Washington",
  ];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const delivery = ref("standard");
  const placed = ref(false);

  const subtotal = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function priceFor(option: DeliveryOption) {
    return option.freeOver && subtotal.value >= option.freeOver ? 0 : option.price;
  }

  const shippingCost = computed(() => {
    const option = props.deliveryOptions.find((o) => o.value === delivery.value);
    return option ? priceFor(option) : 0;
  });
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
    state: string().required("Select a state").label("State"),
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

  const { handleSubmit, isSubmitting, values } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
    initialValues: { state: "" },
  });

  const firstName = computed(() => values.firstName || "there");
  const email = computed(() => values.email || "your email");

  // Replace the timeout with a request to your payment provider.
  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    placed.value = true;
  });
</script>
