<template>
  <!--
    Saved payment methods
    Features: Card list with brand icon and expiry, default marker, set default and remove actions, add card dialog
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction>
        <UiDialog v-model:open="dialogOpen">
          <UiDialogTrigger as-child>
            <UiButton size="sm">
              <Icon name="lucide:plus" class="size-4" />
              Add card
            </UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-md">
            <UiDialogHeader>
              <UiDialogTitle>Add a card</UiDialogTitle>
              <UiDialogDescription
                >Your card details are sent securely to Stripe.</UiDialogDescription
              >
            </UiDialogHeader>
            <form class="grid gap-4" @submit.prevent="addCard">
              <div class="grid gap-2">
                <UiLabel for="pm-number">Card number</UiLabel>
                <UiInput
                  id="pm-number"
                  v-model="draft.number"
                  inputmode="numeric"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <UiLabel for="pm-expiry">Expiry</UiLabel>
                  <UiInput id="pm-expiry" v-model="draft.expiry" placeholder="MM/YY" />
                </div>
                <div class="grid gap-2">
                  <UiLabel for="pm-cvc">CVC</UiLabel>
                  <UiInput id="pm-cvc" v-model="draft.cvc" inputmode="numeric" placeholder="123" />
                </div>
              </div>
              <UiDialogFooter>
                <UiDialogClose as-child>
                  <UiButton type="button" variant="outline">Cancel</UiButton>
                </UiDialogClose>
                <UiButton type="submit">Add card</UiButton>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-3">
      <div
        v-for="card in cards"
        :key="card.id"
        class="flex flex-wrap items-center gap-4 rounded-lg border p-4"
      >
        <div class="bg-muted flex h-9 w-14 items-center justify-center rounded-md border">
          <Icon :name="card.icon" class="size-6" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium">{{ card.brand }} ending in {{ card.last4 }}</p>
            <UiBadge v-if="card.default" variant="secondary">Default</UiBadge>
          </div>
          <p class="text-muted-foreground text-sm">Expires {{ card.expiry }}</p>
        </div>
        <div class="flex gap-1">
          <UiButton v-if="!card.default" variant="ghost" size="sm" @click="makeDefault(card.id)">
            Set as default
          </UiButton>
          <UiButton
            variant="ghost"
            size="sm"
            class="text-destructive hover:text-destructive"
            :disabled="card.default"
            @click="remove(card.id)"
          >
            Remove
          </UiButton>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type PaymentCard = {
    id: number;
    brand: string;
    icon: string;
    last4: string;
    expiry: string;
    default?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Payment methods",
      description: "Manage the cards on file for this workspace.",
    }
  );

  const cards = ref<PaymentCard[]>([
    { id: 1, brand: "Visa", icon: "logos:visa", last4: "4242", expiry: "08/2028", default: true },
    { id: 2, brand: "Mastercard", icon: "logos:mastercard", last4: "5555", expiry: "11/2027" },
  ]);

  const dialogOpen = ref(false);
  const draft = reactive({ number: "", expiry: "", cvc: "" });

  function makeDefault(id: number) {
    cards.value.forEach((card) => {
      card.default = card.id === id;
    });
    useSonner.success("Default card updated");
  }

  function remove(id: number) {
    cards.value = cards.value.filter((card) => card.id !== id);
    useSonner.success("Card removed");
  }

  function addCard() {
    const digits = draft.number.replace(/\D/g, "");
    if (digits.length < 12 || !draft.expiry || !draft.cvc) {
      useSonner.error("Check your card details");
      return;
    }
    cards.value.push({
      id: Date.now(),
      brand: "Visa",
      icon: "logos:visa",
      last4: digits.slice(-4),
      expiry: draft.expiry,
    });
    Object.assign(draft, { number: "", expiry: "", cvc: "" });
    dialogOpen.value = false;
    useSonner.success("Card added");
  }
</script>
