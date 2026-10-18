<template>
  <!--
    Multi step checkout with a stepper
    Features: Information, shipping and payment steps with a numbered stepper that blocks skipping ahead, each step validates before continuing, entered values are kept when going back, delivery cards, a recap of earlier answers and a sticky order summary
  -->
  <UiContainer class="py-12 lg:py-20">
    <div v-if="!placed" class="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
      <div>
        <UiStepper v-model="step" class="mb-10">
          <UiStepperItem
            v-for="s in steps"
            :key="s.id"
            :step="s.id"
            :disabled="s.id > step"
            :class="s.id !== steps.length ? 'flex-1' : ''"
          >
            <UiStepperTrigger class="flex-col gap-2 sm:flex-row">
              <UiStepperIndicator>{{ s.id }}</UiStepperIndicator>
              <span class="hidden text-sm font-medium sm:block">{{ s.title }}</span>
            </UiStepperTrigger>
            <UiStepperSeparator v-if="s.id < steps.length" />
          </UiStepperItem>
        </UiStepper>

        <div
          v-if="step > 1"
          class="bg-muted/40 mb-8 divide-y rounded-xl border text-sm"
          aria-label="Your details so far"
        >
          <div class="flex items-center justify-between gap-4 p-4">
            <span class="text-muted-foreground w-16 shrink-0">Contact</span>
            <span class="min-w-0 flex-1 truncate">{{ values.email }}</span>
            <button type="button" class="underline underline-offset-4" @click="step = 1">
              Change
            </button>
          </div>
          <div class="flex items-center justify-between gap-4 p-4">
            <span class="text-muted-foreground w-16 shrink-0">Ship to</span>
            <span class="min-w-0 flex-1 truncate">
              {{ values.address }}, {{ values.city }} {{ values.zip }}
            </span>
            <button type="button" class="underline underline-offset-4" @click="step = 1">
              Change
            </button>
          </div>
          <div v-if="step > 2" class="flex items-center justify-between gap-4 p-4">
            <span class="text-muted-foreground w-16 shrink-0">Method</span>
            <span class="min-w-0 flex-1 truncate"
              >{{ selectedOption?.label }}, {{ selectedOption?.eta }}</span
            >
            <button type="button" class="underline underline-offset-4" @click="step = 2">
              Change
            </button>
          </div>
        </div>

        <form novalidate @submit.prevent="onSubmit">
          <section v-if="step === 1" class="space-y-4" aria-labelledby="step-1">
            <h2 id="step-1" class="text-xl font-semibold">Your information</h2>
            <UiVeeInput
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
            />
            <div class="grid gap-4 sm:grid-cols-2">
              <UiVeeInput name="firstName" label="First name" autocomplete="given-name" />
              <UiVeeInput name="lastName" label="Last name" autocomplete="family-name" />
            </div>
            <UiVeeInput
              name="address"
              label="Address"
              placeholder="123 Market Street"
              autocomplete="address-line1"
            />
            <div class="grid gap-4 sm:grid-cols-2">
              <UiVeeInput name="city" label="City" autocomplete="address-level2" />
              <UiVeeInput
                name="zip"
                label="ZIP code"
                placeholder="94103"
                autocomplete="postal-code"
                inputmode="numeric"
              />
            </div>
          </section>

          <section v-else-if="step === 2" aria-labelledby="step-2">
            <h2 id="step-2" class="text-xl font-semibold">Delivery method</h2>
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

          <section v-else class="space-y-4" aria-labelledby="step-3">
            <h2 id="step-3" class="text-xl font-semibold">Payment</h2>
            <UiVeeInput name="nameOnCard" label="Name on card" autocomplete="cc-name" />
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

          <div class="mt-8 flex items-center justify-between gap-3">
            <UiButton v-if="step > 1" type="button" variant="ghost" @click="step--">
              <Icon name="lucide:arrow-left" />
              Back
            </UiButton>
            <span v-else />
            <UiButton type="submit" size="lg" :loading="isSubmitting">
              {{ step === steps.length ? `Pay ${money.format(total)}` : "Continue" }}
            </UiButton>
          </div>
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
      <h1 class="mt-6 text-3xl font-bold tracking-tight">Order confirmed</h1>
      <p class="text-muted-foreground mt-3">
        Thanks {{ values.firstName }}. Order <strong class="text-foreground">AR-48213</strong> is on
        its way to {{ values.address }}.
      </p>
      <UiButton class="mt-8" @click="restart">Continue shopping</UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

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

  const steps = [
    { id: 1, title: "Information" },
    { id: 2, title: "Shipping" },
    { id: 3, title: "Payment" },
  ];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const step = ref(1);
  const delivery = ref("standard");
  const placed = ref(false);

  const subtotal = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function priceFor(option: DeliveryOption) {
    return option.freeOver && subtotal.value >= option.freeOver ? 0 : option.price;
  }

  const selectedOption = computed(() =>
    props.deliveryOptions.find((o) => o.value === delivery.value)
  );
  const shippingCost = computed(() => (selectedOption.value ? priceFor(selectedOption.value) : 0));
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

  // Each step only validates its own fields, and values survive going back.
  const schemas = [
    object({
      email: string().email("Enter a valid email address").required().label("Email"),
      firstName: string().required().label("First name"),
      lastName: string().required().label("Last name"),
      address: string().required().label("Address"),
      city: string().required().label("City"),
      zip: string()
        .matches(/^\d{5}$/, "Enter a 5 digit ZIP code")
        .required()
        .label("ZIP code"),
    }),
    object({}),
    object({
      nameOnCard: string().required().label("Name on card"),
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
    }),
  ];

  const { handleSubmit, isSubmitting, values, resetForm } = useForm({
    validationSchema: computed(() => schemas[step.value - 1]),
    keepValuesOnUnmount: true,
  });

  // Replace the timeout with a request to your payment provider on the last step.
  const onSubmit = handleSubmit(async () => {
    if (step.value < steps.length) {
      step.value++;
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 900));
    placed.value = true;
  });

  function restart() {
    placed.value = false;
    step.value = 1;
    resetForm();
  }
</script>
