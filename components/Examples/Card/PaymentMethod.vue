<template>
  <Form @submit="submitPayment" :validation-schema="PaymentSchema">
    <UICard description="Add a new payment method to your account.">
      <template #title>
        <UICardTitle class="text-xl"> Payment Method </UICardTitle>
      </template>
      <template #content>
        <UICardContent>
          <!-- Payment methods -->
          <div class="grid gap-4">
            <UIRadioGroup orientation="horizontal" class="grid grid-cols-3 gap-4">
              <template v-for="(p, i) in paymentMethods" :key="`payment-method-${i}`">
                <div>
                  <UIRadioGroupItem :value="p.id" :id="p.id" class="peer sr-only" />
                  <UILabel
                    :for="p.id"
                    class="flex flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Icon class="h-6 w-6" :name="p.icon" />
                    <span class="text-sm">{{ p.name }}</span>
                  </UILabel>
                </div>
              </template>
            </UIRadioGroup>
            <!-- Form -->
            <UIFormInput label="Name" name="name" placeholder="First & last name" />
            <UIFormInput label="Card number" name="cardNumber" type="number" />
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <UIFormSelect name="expires" placeholder="Month" label="Expires">
                <template #content>
                  <UISelectContent>
                    <UISelectItem
                      v-for="m in monthsOfYear"
                      :key="m"
                      :value="m"
                      :text-value="m"
                      :text="m"
                    />
                  </UISelectContent>
                </template>
              </UIFormSelect>
              <UIFormSelect name="year" placeholder="Year" label="Year">
                <template #content>
                  <UISelectContent>
                    <UISelectItem
                      v-for="m in years"
                      :key="m"
                      :value="m"
                      :text-value="m"
                      :text="m"
                    />
                  </UISelectContent>
                </template>
              </UIFormSelect>
              <UIFormInput label="CVC" name="cvc" maxlength="3" placeholder="CVC" />
            </div>
          </div>
        </UICardContent>
      </template>
      <template #footer>
        <UICardFooter>
          <UIButton type="submit" class="w-full">Continue</UIButton>
        </UICardFooter>
      </template>
    </UICard>
  </Form>
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

  const submitPayment = (values: any) => {
    console.log(values);
  };

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
