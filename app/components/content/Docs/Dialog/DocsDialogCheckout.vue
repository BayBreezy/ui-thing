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
                class="relative flex cursor-pointer flex-col gap-1 rounded-lg border border-input p-4 shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent/70 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
              >
                <UiRadioGroupItem
                  :id="`radio-${plan.id}`"
                  :value="plan.id"
                  class="sr-only after:absolute after:inset-0"
                />
                <div class="inline-flex items-start justify-between gap-2">
                  <p class="font-medium text-foreground md:text-sm">{{ plan.name }}</p>
                  <UiBadge v-if="plan.popular">Popular</UiBadge>
                </div>
                <p class="text-sm text-muted-foreground">{{ plan.price }}</p>
              </label>
            </UiRadioGroup>

            <UiVeeInput name="nameOnCard" label="Name on card" required />
            <div class="space-y-2">
              <legend class="text-sm font-medium text-foreground">Card Details</legend>
              <div class="rounded-lg shadow-sm shadow-black/5">
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
                  <div class="min-w-0 flex-1 focus-within:z-10">
                    <UiVeeInput
                      v-maska="'##/##'"
                      placeholder="MM/YY"
                      aria-label="Expiry date"
                      name="expiryDate"
                      class="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                    />
                  </div>
                  <div class="-ms-px min-w-0 flex-1 focus-within:z-10">
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
              class="text-base underline underline-offset-2 hover:no-underline md:text-sm"
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

        <p class="text-center text-xs text-muted-foreground">
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
