<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Checkout</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px]">
        <div class="mb-2 flex flex-col gap-2">
          <UiFancyIcon circle class="mb-2">
            <Icon name="lucide:store" class="size-5 opacity-80" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="text-left">Confirm and pay</UiDialogTitle>
            <UiDialogDescription class="text-left">
              Pay securely and cancel any time.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <div class="space-y-6 md:space-y-4">
            <UiRadioGroup orientation="horizontal" class="grid-cols-2" default-value="yearly">
              <label
                v-for="plan in plans"
                :key="plan.id"
                :for="`radio-${plan.id}`"
                class="border-input has-focus-visible:outline-ring/50 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent/70 relative flex cursor-pointer flex-col gap-1 rounded-lg border p-4 shadow-xs shadow-black/5 transition-colors has-focus-visible:outline-3"
              >
                <UiRadioGroupItem
                  :id="`radio-${plan.id}`"
                  :value="plan.id"
                  class="sr-only after:absolute after:inset-0"
                />
                <div class="inline-flex items-start justify-between gap-2">
                  <p class="text-foreground font-medium md:text-sm">{{ plan.name }}</p>
                  <UiBadge v-if="plan.popular">Popular</UiBadge>
                </div>
                <p class="text-muted-foreground text-sm">{{ plan.price }}</p>
              </label>
            </UiRadioGroup>

            <UiVeeInput name="nameOnCard" label="Name on card" required />
            <div class="space-y-2">
              <legend class="text-foreground text-sm font-medium">Card Details</legend>
              <div class="rounded-lg shadow-xs shadow-black/5">
                <div class="relative focus-within:z-10">
                  <UiVeeInput
                    v-maska="'#### #### #### ####'"
                    placeholder="Card number"
                    aria-label="Card number"
                    trailing-icon="lucide:credit-card"
                    name="cardNumber"
                    class="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                  />
                </div>
                <div class="-mt-px flex">
                  <div class="min-w-0 focus-within:z-10">
                    <UiVeeInput
                      v-maska="'##/##'"
                      placeholder="MM/YY"
                      aria-label="Expiry date"
                      name="expiryDate"
                      class="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                    />
                  </div>
                  <div class="-ms-px min-w-0 focus-within:z-10">
                    <UiVeeInput
                      v-maska="'###'"
                      placeholder="CVC"
                      aria-label="CVC"
                      name="cvc"
                      class="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              v-if="!showCouponInput"
              type="button"
              class="text-sm underline underline-offset-2 hover:no-underline"
              @click="showCouponInput = true"
            >
              + Add coupon
            </button>

            <div v-else>
              <UiVeeInput name="coupon" label="Coupon code" placeholder="Enter your code" />
            </div>
          </div>
          <UiButton type="button" class="w-full"> Subscribe </UiButton>
        </form>

        <p class="text-muted-foreground text-center text-xs">
          Payments are non-refundable. Cancel anytime.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const showCouponInput = ref(false);
  const plans = [
    { id: "monthly", name: "Monthly", price: "$32/month", popular: false },
    { id: "yearly", name: "Yearly", price: "$320/month", popular: true },
  ];
</script>
