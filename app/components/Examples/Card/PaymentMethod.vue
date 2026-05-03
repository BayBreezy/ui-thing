<template>
  <UiCard
    as="form"
    title="Payment method"
    description="Add a new payment method to your account."
    @submit="submitPayment"
  >
    <template #content>
      <UiCardContent>
        <!-- Payment methods -->
        <div class="grid gap-4">
          <UiRadioGroup orientation="horizontal" class="grid grid-cols-3 gap-4">
            <template v-for="(p, i) in paymentMethods" :key="`payment-method-${i}`">
              <div>
                <UiRadioGroupItem :id="p.id" :value="p.id" class="peer sr-only" />
                <UiLabel
                  :for="p.id"
                  class="border-muted bg-popover peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between gap-3 rounded-md border-2 p-4"
                >
                  <Icon class="h-6 w-6" :name="p.icon" />
                  <span class="text-sm">{{ p.name }}</span>
                </UiLabel>
              </div>
            </template>
          </UiRadioGroup>
          <!-- Form -->
          <UiVeeInput label="Name" name="name" placeholder="First & last name" />
          <UiVeeInput label="Card number" name="cardNumber" />
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <UiFormSelect name="expires" placeholder="Month" label="Expires">
              <template #content>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="m in monthsOfYear"
                    :key="m"
                    :value="m"
                    :text-value="m"
                    :text="m"
                  />
                </UiSelectContent>
              </template>
            </UiFormSelect>
            <UiFormSelect name="year" placeholder="Year" label="Year">
              <template #content>
                <UiSelectContent>
                  <UiSelectItem v-for="m in years" :key="m" :value="m" :text-value="m" :text="m" />
                </UiSelectContent>
              </template>
            </UiFormSelect>
            <UiVeeInput label="CVC" name="cvc" :maxlength="3" placeholder="CVC" />
          </div>
        </div>
      </UiCardContent>
    </template>
    <template #footer>
      <UiCardFooter>
        <UiButton type="submit" class="w-full">Continue</UiButton>
      </UiCardFooter>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import dayjs from "dayjs";
  import { object, string } from "yup";

  const PaymentSchema = object({
    name: string().required().label("Name").trim(),
    cardNumber: string().label("Card number").required(),
    expires: string().label("Exp").required("Required"),
    year: string().label("Year").required("Required"),
    cvc: string().label("CVC").length(3).required("Required"),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(PaymentSchema),
  });

  const submitPayment = handleSubmit(async (_) => {
    const id = useSonner.loading("Adding your payment method now...");
    await promiseTimeout(2000);
    useSonner.dismiss(id);
    useSonner.success("Payment Method Added", {
      description: "Your payment method has been added",
    });
  });

  const paymentMethods = [
    {
      id: "payment-card",
      name: "Card",
      icon: "mdi:credit-card",
    },
    {
      id: "payment-paypal",
      name: "Paypal",
      icon: "mdi:paypal",
    },
    {
      id: "payment-apple",
      name: "Apple",
      icon: "mdi:apple",
    },
  ];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 10 }, (_, i) => dayjs().add(i, "year").get("year").toString());
</script>
