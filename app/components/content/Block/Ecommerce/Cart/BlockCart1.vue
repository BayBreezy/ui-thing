<template>
  <!--
    Cart drawer that slides in from the right
    Features: Header with a live item count badge, sheet drawer with line items, quantity stepper and remove buttons, subtotal and checkout actions, a friendly empty state and focus handling from the sheet
  -->
  <UiContainer class="py-6">
    <header class="flex items-center justify-between rounded-xl border px-5 py-3">
      <span class="text-lg font-semibold tracking-tight">Alder &amp; Row</span>
      <nav class="text-muted-foreground hidden gap-6 text-sm sm:flex" aria-label="Main">
        <a href="#" class="hover:text-foreground">Shop</a>
        <a href="#" class="hover:text-foreground">Journal</a>
        <a href="#" class="hover:text-foreground">About</a>
      </nav>

      <UiSheet v-model:open="open">
        <UiSheetTrigger as-child>
          <UiButton variant="outline" size="sm" :aria-label="`Open cart, ${count} items`">
            <Icon name="lucide:shopping-bag" />
            Cart
            <UiBadge size="sm" shape="pill">{{ count }}</UiBadge>
          </UiButton>
        </UiSheetTrigger>
        <UiSheetContent side="right" class="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <UiSheetHeader class="border-b p-5">
            <UiSheetTitle>Your cart ({{ count }})</UiSheetTitle>
            <UiSheetDescription class="sr-only">
              Review the items in your cart and continue to checkout.
            </UiSheetDescription>
          </UiSheetHeader>

          <ul v-if="items.length" class="flex-1 divide-y overflow-y-auto px-5">
            <li v-for="item in items" :key="item.id" class="flex gap-4 py-5">
              <img
                :src="item.image"
                :alt="item.name"
                class="bg-muted size-20 shrink-0 rounded-lg object-cover"
              />
              <div class="flex min-w-0 flex-1 flex-col">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <a :href="item.href" class="block truncate text-sm font-medium hover:underline">
                      {{ item.name }}
                    </a>
                    <p class="text-muted-foreground text-xs">{{ item.variant }}</p>
                  </div>
                  <p class="text-sm font-semibold tabular-nums">
                    {{ money.format(item.price * item.quantity) }}
                  </p>
                </div>
                <div class="mt-auto flex items-center justify-between pt-3">
                  <div class="flex items-center rounded-md border">
                    <UiButton
                      variant="ghost"
                      size="icon-xs"
                      :disabled="item.quantity <= 1"
                      :aria-label="`Decrease quantity of ${item.name}`"
                      @click="item.quantity--"
                    >
                      <Icon name="lucide:minus" />
                    </UiButton>
                    <span class="w-8 text-center text-sm tabular-nums" aria-live="polite">
                      {{ item.quantity }}
                    </span>
                    <UiButton
                      variant="ghost"
                      size="icon-xs"
                      :disabled="item.quantity >= 10"
                      :aria-label="`Increase quantity of ${item.name}`"
                      @click="item.quantity++"
                    >
                      <Icon name="lucide:plus" />
                    </UiButton>
                  </div>
                  <button
                    type="button"
                    class="text-muted-foreground hover:text-destructive text-xs underline underline-offset-4"
                    @click="remove(item.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <UiEmpty v-else class="flex-1">
            <UiEmptyHeader>
              <UiEmptyMedia>
                <UiFancyIcon icon="lucide:shopping-bag" theme="modern-neue" />
              </UiEmptyMedia>
              <UiEmptyTitle>Your cart is empty</UiEmptyTitle>
              <UiEmptyDescription>Items you add will show up here.</UiEmptyDescription>
            </UiEmptyHeader>
            <UiEmptyContent>
              <UiButton variant="outline" @click="open = false">Continue shopping</UiButton>
            </UiEmptyContent>
          </UiEmpty>

          <UiSheetFooter v-if="items.length" class="border-t p-5">
            <dl class="space-y-1.5 text-sm">
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Subtotal</dt>
                <dd class="font-semibold tabular-nums" aria-live="polite">
                  {{ money.format(subtotal) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Shipping</dt>
                <dd class="text-muted-foreground">Calculated at checkout</dd>
              </div>
            </dl>
            <UiButton class="mt-3 w-full" size="lg">
              Checkout
              <Icon name="lucide:arrow-right" />
            </UiButton>
            <UiButton variant="ghost" class="w-full" @click="open = false">
              Continue shopping
            </UiButton>
          </UiSheetFooter>
        </UiSheetContent>
      </UiSheet>
    </header>
  </UiContainer>
</template>

<script lang="ts" setup>
  type CartItem = {
    id: number;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
    href: string;
  };

  const props = withDefaults(
    defineProps<{
      items?: CartItem[];
      /** Whether the drawer starts open. */
      defaultOpen?: boolean;
    }>(),
    {
      defaultOpen: false,
      items: () => [
        {
          id: 7,
          name: "Bomber Jacket",
          variant: "Rust · M",
          price: 138,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
          href: "#",
        },
        {
          id: 9,
          name: "Classic Tee",
          variant: "White · L",
          price: 32,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
          href: "#",
        },
        {
          id: 11,
          name: "Canvas Tote",
          variant: "Natural",
          price: 28,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
          href: "#",
        },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const open = ref(props.defaultOpen);
  const items = ref<CartItem[]>(props.items.map((item) => ({ ...item })));

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function remove(id: number) {
    items.value = items.value.filter((item) => item.id !== id);
  }
</script>
