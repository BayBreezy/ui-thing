<template>
  <!--
    Return or refund request form
    Features: Choose which items and how many to return, reason and item condition, refund to the original payment or store credit, optional comments, a live refund estimate, validation with vee-validate and a return label confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div v-if="!submitted">
        <h1 class="text-3xl font-bold tracking-tight">Return items</h1>
        <p class="text-muted-foreground mt-2 text-sm">
          Order {{ orderId }}. Returns are free within {{ windowDays }} days of delivery.
        </p>

        <form class="mt-8 space-y-8" novalidate @submit.prevent="submit">
          <fieldset>
            <legend class="font-semibold">What would you like to return?</legend>
            <ul
              class="mt-4 divide-y rounded-xl border"
              :class="itemsError ? 'border-destructive' : ''"
            >
              <li v-for="item in items" :key="item.id" class="flex items-center gap-4 p-4">
                <UiCheckbox
                  :id="`return-${item.id}`"
                  :model-value="selection[item.id]! > 0"
                  :aria-label="`Return ${item.name}`"
                  @update:model-value="toggle(item)"
                />
                <label
                  :for="`return-${item.id}`"
                  class="flex min-w-0 flex-1 cursor-pointer items-center gap-4"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="bg-muted size-14 rounded-lg object-cover"
                  />
                  <span class="min-w-0 flex-1">
                    <span class="block truncate text-sm font-medium">{{ item.name }}</span>
                    <span class="text-muted-foreground block text-xs">
                      {{ item.variant }}, {{ money.format(item.price) }} each
                    </span>
                  </span>
                </label>
                <div v-if="selection[item.id]! > 0 && item.quantity > 1" class="w-28">
                  <UiNumberField
                    :model-value="selection[item.id]"
                    :min="1"
                    :max="item.quantity"
                    @update:model-value="(v) => (selection[item.id] = v ?? 1)"
                  >
                    <UiNumberFieldDecrement />
                    <UiNumberFieldInput
                      class="text-center"
                      :aria-label="`Quantity of ${item.name} to return`"
                    />
                    <UiNumberFieldIncrement />
                  </UiNumberField>
                </div>
              </li>
            </ul>
            <p v-if="itemsError" class="text-destructive mt-2 text-sm" role="alert">
              Select at least one item to return.
            </p>
          </fieldset>

          <div class="grid gap-4 sm:grid-cols-2">
            <UiVeeSelect name="reason" label="Reason for return">
              <option value="" disabled>Select a reason</option>
              <option v-for="reason in reasons" :key="reason" :value="reason">{{ reason }}</option>
            </UiVeeSelect>
            <UiVeeSelect name="condition" label="Item condition">
              <option value="" disabled>Select a condition</option>
              <option v-for="c in conditions" :key="c" :value="c">{{ c }}</option>
            </UiVeeSelect>
          </div>

          <UiVeeTextarea
            name="comments"
            label="Anything else we should know? (optional)"
            placeholder="Tell us what went wrong so we can improve"
            :rows="4"
          />

          <fieldset>
            <legend class="font-semibold">How should we refund you?</legend>
            <UiRadioGroup
              v-model="method"
              class="mt-4 grid gap-3 sm:grid-cols-2"
              aria-label="Refund method"
            >
              <label
                v-for="option in methods"
                :key="option.value"
                :for="`method-${option.value}`"
                class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
              >
                <UiRadioGroupItem
                  :id="`method-${option.value}`"
                  :value="option.value"
                  class="mt-0.5"
                />
                <span>
                  <span class="block text-sm font-medium">{{ option.label }}</span>
                  <span class="text-muted-foreground block text-xs">{{ option.description }}</span>
                </span>
              </label>
            </UiRadioGroup>
          </fieldset>

          <div class="bg-muted/40 flex items-center justify-between rounded-xl border p-4">
            <div>
              <p class="text-sm font-medium">Estimated refund</p>
              <p class="text-muted-foreground text-xs">
                {{
                  method === "credit"
                    ? "Store credit, available immediately"
                    : "Back to your card in 5 to 7 days"
                }}
              </p>
            </div>
            <p class="text-xl font-semibold tabular-nums" aria-live="polite">
              {{ money.format(method === "credit" ? refund * 1.1 : refund) }}
            </p>
          </div>

          <UiButton type="submit" size="lg" class="w-full" :loading="isSubmitting">
            Request return
          </UiButton>
        </form>
      </div>

      <div v-else class="text-center" role="status">
        <span
          class="mx-auto grid size-14 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:check" class="size-7" />
        </span>
        <h1 class="mt-6 text-3xl font-bold tracking-tight">Return requested</h1>
        <p class="text-muted-foreground mt-3">
          Your return <strong class="text-foreground">RMA-20931</strong> is approved. We emailed a
          free prepaid label.
        </p>
        <ol class="mx-auto mt-8 max-w-sm space-y-3 text-left text-sm">
          <li v-for="(step, i) in nextSteps" :key="step" class="flex gap-3">
            <span
              class="bg-muted grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold"
            >
              {{ i + 1 }}
            </span>
            {{ step }}
          </li>
        </ol>
        <UiButton class="mt-8" variant="outline" @click="reset">Start another return</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  type ReturnItem = {
    id: number;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  };

  const props = withDefaults(
    defineProps<{
      orderId?: string;
      windowDays?: number;
      items?: ReturnItem[];
      reasons?: string[];
      conditions?: string[];
    }>(),
    {
      orderId: "AR-48213",
      windowDays: 30,
      reasons: () => [
        "Does not fit",
        "Not as described",
        "Arrived damaged",
        "Changed my mind",
        "Ordered by mistake",
      ],
      conditions: () => ["Unworn with tags", "Worn once", "Opened or used", "Damaged"],
      items: () => [
        {
          id: 1,
          name: "Bomber Jacket",
          variant: "Rust · M",
          price: 138,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 2,
          name: "Classic Tee",
          variant: "White · L",
          price: 32,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
        },
        {
          id: 3,
          name: "Canvas Tote",
          variant: "Natural",
          price: 28,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80",
        },
      ],
    }
  );

  const methods = [
    {
      value: "original",
      label: "Original payment",
      description: "Refund to the card you paid with.",
    },
    {
      value: "credit",
      label: "Store credit",
      description: "Get a 10% bonus on the refund amount.",
    },
  ];

  const nextSteps = [
    "Print the label or show the QR code at a drop off point.",
    "Pack the items in their original packaging if you can.",
    "Your refund starts once we receive the parcel.",
  ];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const submitted = ref(false);
  const itemsError = ref(false);
  const method = ref("original");
  // Item id mapped to how many units are being returned. Zero means not selected.
  const selection = reactive<Record<number, number>>(
    Object.fromEntries(props.items.map((item) => [item.id, 0]))
  );

  const refund = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * (selection[item.id] ?? 0), 0)
  );

  function toggle(item: ReturnItem) {
    selection[item.id] = selection[item.id]! > 0 ? 0 : 1;
    itemsError.value = false;
  }

  const schema = object({
    reason: string().required("Choose a reason").label("Reason"),
    condition: string().required("Choose a condition").label("Condition"),
    comments: string().optional(),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: schema,
    initialValues: { reason: "", condition: "", comments: "" },
  });

  // Replace the timeout with a request that creates the return.
  const submit = handleSubmit(
    async () => {
      if (refund.value === 0) {
        itemsError.value = true;
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
      submitted.value = true;
    },
    () => {
      itemsError.value = refund.value === 0;
    }
  );

  function reset() {
    submitted.value = false;
    itemsError.value = false;
    method.value = "original";
    for (const key of Object.keys(selection)) selection[Number(key)] = 0;
    resetForm();
  }
</script>
