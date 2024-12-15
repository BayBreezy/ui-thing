<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Card details</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px]">
        <div class="flex flex-col gap-3">
          <UiFancyIcon circle>
            <Icon name="lucide:wallet" class="size-5 opacity-80" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="text-left">Update your card</UiDialogTitle>
            <UiDialogDescription class="text-left">
              Your new card will replace your current card.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>
        <form class="mt-4 space-y-6" @submit="submit">
          <fieldset :disabled="isSubmitting" class="space-y-6 md:space-y-4">
            <UiVeeInput name="nameOnCard" label="Name on card" required />
            <UiVeeInput
              v-maska="'#### #### #### ####'"
              name="cardNumber"
              trailing-icon="lucide:credit-card"
              label="Card number"
              required
            />
            <div class="flex gap-4">
              <div class="flex-1 space-y-2">
                <UiVeeInput
                  v-maska="'##/##'"
                  name="expiryDate"
                  placeholder="MM/YY"
                  label="Expiry date"
                  required
                />
              </div>
              <div class="flex-1 space-y-2">
                <UiVeeInput v-maska="'###'" name="cvc" label="CVC" required />
              </div>
            </div>
          </fieldset>
          <UiVeeCheckbox
            name="saveCard"
            class="text-muted-foreground"
            label="Save card for future payments"
          />
          <UiButton type="submit" class="w-full"> Update card </UiButton>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-card-details",
    validationSchema: toTypedSchema(
      z.object({
        nameOnCard: z.string().min(2).max(50).default("Elijah Baker"),
        cardNumber: z.string().length(19, "Must be 16 digits").default("4242 4242 4242 4242"),
        expiryDate: z.string().length(5, "Invalid").default(dayjs().format("MM/YY")),
        cvc: z.string().length(3, "Invalid").default("123"),
        saveCard: z.boolean().optional().default(true),
      })
    ),
  });
  const open = defineModel<boolean>({ default: false });
  const submit = handleSubmit(async (values) => {
    try {
      useSonner.success("Card updated successfully", {
        description: `Your card ending with ${values.cardNumber.slice(-4)} has been updated successfully.`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("Unable to update card", {
        description: error.message,
      });
    }
  });
</script>
