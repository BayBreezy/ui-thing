<template>
  <form @submit="submitPayment">
    <UiCard description="Add a new payment method to your account.">
      <template #title>
        <UiCardTitle class="text-xl"> Payment Method </UiCardTitle>
      </template>
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
                    class="flex flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                    <UiSelectItem
                      v-for="m in years"
                      :key="m"
                      :value="m"
                      :text-value="m"
                      :text="m"
                    />
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
  </form>
</template>

<script lang="ts" setup>
  import { addYears } from "date-fns";
  import { z } from "zod";

  const PaymentSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    cardNumber: z.string({ required_error: "Card number is required" }),
    expires: z.string({ required_error: "Required" }),
    year: z.string({ required_error: "Required" }),
    cvc: z.string({ required_error: "Required" }).min(3, "CVC is too short"),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(PaymentSchema),
  });

  const submitPayment = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    await new Promise<void>((res, rej) => {
      useSonner.promise(promise, {
        loading: "Adding your payment method...",
        success: (_: any) => {
          res();
          return "Payment method added!";
        },
        error: (e: any) => {
          rej(e);
          return "Error! Your information could not be sent to our servers!";
        },
      });
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

  const years = Array.from({ length: 10 }, (_, i) =>
    addYears(new Date(), i).getFullYear().toString()
  );
</script>
