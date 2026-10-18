<template>
  <!--
    Payment form with a live card preview
    Features: Masked card number, expiry and security code fields, a card preview that updates as you type and detects the network, luhn and expiry validation, a fill test card shortcut and a secure payment confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="lg:order-2">
        <div class="mx-auto w-full max-w-sm lg:sticky lg:top-8">
          <UiCreditCard
            :width="360"
            variant="gray-dark"
            company="Alder & Row"
            :card-number="displayNumber"
            :card-holder="(values.nameOnCard || 'Name on card').toUpperCase()"
            :card-expiration="values.expiry || 'MM/YY'"
            :network-icon="network"
          />
          <ul class="text-muted-foreground mt-8 space-y-3 text-sm">
            <li class="flex items-center gap-3">
              <Icon name="lucide:shield-check" class="text-primary size-4" />
              Your card details are encrypted and never stored on our servers.
            </li>
            <li class="flex items-center gap-3">
              <Icon name="lucide:rotate-ccw" class="text-primary size-4" />
              Free returns for 30 days if you change your mind.
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:order-1">
        <div v-if="!paid">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold tracking-tight">Payment details</h1>
              <p class="text-muted-foreground mt-1 text-sm">
                Pay {{ money.format(amount) }} securely.
              </p>
            </div>
            <UiButton type="button" variant="outline" size="sm" @click="fillTestCard">
              Fill test card
            </UiButton>
          </div>

          <form class="mt-8 space-y-4" novalidate @submit.prevent="submit">
            <UiVeeInput
              name="nameOnCard"
              label="Name on card"
              placeholder="Sarah Johnson"
              autocomplete="cc-name"
            />
            <UiVeeInput
              v-maska="'#### #### #### ####'"
              name="cardNumber"
              label="Card number"
              placeholder="4242 4242 4242 4242"
              autocomplete="cc-number"
              inputmode="numeric"
              icon="lucide:credit-card"
            />
            <div class="grid grid-cols-2 gap-4">
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
            <UiVeeInput
              name="zip"
              label="Billing ZIP code"
              placeholder="94103"
              autocomplete="postal-code"
              inputmode="numeric"
            />
            <UiVeeCheckbox name="save" label="Save this card for next time" />
            <UiButton type="submit" size="lg" class="w-full" :loading="isSubmitting">
              <Icon name="lucide:lock" />
              Pay {{ money.format(amount) }}
            </UiButton>
            <p class="text-muted-foreground text-center text-xs">
              Demo form. Connect your payment provider's hosted fields before taking real payments.
            </p>
          </form>
        </div>

        <div v-else class="text-center lg:text-left" role="status">
          <span
            class="grid size-14 place-items-center rounded-full bg-green-500/15 text-green-600 lg:mx-0 dark:text-green-400"
          >
            <Icon name="lucide:check" class="size-7" />
          </span>
          <h1 class="mt-6 text-2xl font-bold tracking-tight">Payment successful</h1>
          <p class="text-muted-foreground mt-2">
            We charged {{ money.format(amount) }} to the card ending in {{ lastFour }}.
          </p>
          <UiButton class="mt-6" variant="outline" @click="paid = false"
            >Make another payment</UiButton
          >
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  withDefaults(defineProps<{ amount?: number }>(), { amount: 248.4 });

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const paid = ref(false);

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
    zip: string()
      .matches(/^\d{5}$/, "Enter a 5 digit ZIP code")
      .required()
      .label("Billing ZIP code"),
  });

  const { handleSubmit, isSubmitting, values, setValues } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const displayNumber = computed(() => values.cardNumber || "•••• •••• •••• ••••");
  // The form unmounts once paid, so the last four digits are kept here.
  const lastFour = ref("");

  // Detects the card network from the first digits.
  const network = computed(() => {
    const digits = (values.cardNumber ?? "").replace(/\D/g, "");
    if (/^4/.test(digits)) return "simple-icons:visa";
    if (/^(5[1-5]|2[2-7])/.test(digits)) return "simple-icons:mastercard";
    if (/^3[47]/.test(digits)) return "simple-icons:americanexpress";
    if (/^6(011|5)/.test(digits)) return "simple-icons:discover";
    return "lucide:credit-card";
  });

  function fillTestCard() {
    setValues({
      nameOnCard: "Sarah Johnson",
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/30",
      cvc: "123",
      zip: "94103",
    });
  }

  // Replace the timeout with a request to your payment provider.
  const submit = handleSubmit(async (formValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    lastFour.value = formValues.cardNumber.replace(/\D/g, "").slice(-4);
    paid.value = true;
  });
</script>
