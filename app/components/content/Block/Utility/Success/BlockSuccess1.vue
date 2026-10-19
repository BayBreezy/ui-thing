<template>
  <!--
    Payment success
    Features: Success header with order number and copy button, itemised receipt with totals and payment method, download receipt and continue actions, confirmation email note
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <div class="text-center">
        <span
          class="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
        >
          <Icon name="lucide:check" class="size-8" />
        </span>
        <h1 class="mt-6 text-3xl font-bold tracking-tight lg:text-4xl">Payment successful</h1>
        <p class="text-muted-foreground mt-3">
          Thanks, {{ customer }}. We sent a receipt to
          <span class="text-foreground font-medium">{{ email }}</span
          >.
        </p>
        <p class="mt-4 inline-flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">Order</span>
          <span class="font-mono font-medium">{{ orderNumber }}</span>
          <UiButton
            variant="ghost"
            size="icon-xs"
            :aria-label="copied ? 'Order number copied' : 'Copy order number'"
            @click="copy(orderNumber)"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
          </UiButton>
        </p>
      </div>

      <UiCard class="mt-8">
        <UiCardHeader>
          <UiCardTitle class="text-base">Receipt</UiCardTitle>
          <UiCardDescription>{{ date }}</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <ul class="divide-y">
            <li
              v-for="item in items"
              :key="item.name"
              class="flex items-start justify-between gap-4 py-2.5 text-sm first:pt-0"
            >
              <span>
                <span class="block font-medium">{{ item.name }}</span>
                <span class="text-muted-foreground block text-xs">Qty {{ item.qty }}</span>
              </span>
              <span class="tabular-nums">{{ money(item.price * item.qty) }}</span>
            </li>
          </ul>
          <dl class="space-y-1.5 border-t pt-4 text-sm">
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Subtotal</dt>
              <dd class="tabular-nums">{{ money(subtotal) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Tax</dt>
              <dd class="tabular-nums">{{ money(tax) }}</dd>
            </div>
            <div class="flex justify-between text-base font-semibold">
              <dt>Total paid</dt>
              <dd class="tabular-nums">{{ money(subtotal + tax) }}</dd>
            </div>
          </dl>
          <p class="text-muted-foreground flex items-center gap-2 text-sm">
            <Icon name="lucide:credit-card" class="size-4" />{{ method }}
          </p>
        </UiCardContent>
      </UiCard>

      <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <UiButton variant="outline" @click="download"
          ><Icon name="lucide:download" class="size-4" />Download receipt</UiButton
        >
        <UiButton>View order<Icon name="lucide:arrow-right" class="size-4" /></UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { name: string; qty: number; price: number };

  const props = withDefaults(
    defineProps<{
      customer?: string;
      email?: string;
      orderNumber?: string;
      date?: string;
      method?: string;
      taxRate?: number;
      items?: Item[];
    }>(),
    {
      customer: "Alex",
      email: "alex@example.com",
      orderNumber: "ORD-48213",
      date: "October 18, 2026",
      method: "Visa ending in 4242",
      taxRate: 0.08,
      items: () => [
        { name: "Pro plan, annual", qty: 1, price: 190 },
        { name: "Extra seat", qty: 3, price: 12 },
      ],
    }
  );

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  const money = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  const subtotal = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  );
  const tax = computed(() => Math.round(subtotal.value * props.taxRate * 100) / 100);

  function download() {
    useSonner.success("Receipt downloaded", { description: `${props.orderNumber}.pdf` });
  }
</script>
