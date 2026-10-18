<template>
  <!--
    Mini cart popover for a site header
    Features: Bag button with an item count badge that opens a popover, scrollable line items with remove buttons, live subtotal, view cart and checkout actions and an empty state
  -->
  <UiContainer class="py-6">
    <header class="flex items-center justify-between rounded-xl border px-5 py-3">
      <span class="text-lg font-semibold tracking-tight">Alder &amp; Row</span>
      <nav class="text-muted-foreground hidden gap-6 text-sm sm:flex" aria-label="Main">
        <a href="#" class="hover:text-foreground">Shop</a>
        <a href="#" class="hover:text-foreground">Journal</a>
        <a href="#" class="hover:text-foreground">About</a>
      </nav>

      <UiPopover v-model:open="open">
        <UiPopoverTrigger as-child>
          <UiButton
            variant="ghost"
            size="icon"
            class="relative"
            :aria-label="`Open mini cart, ${count} items`"
          >
            <Icon name="lucide:shopping-bag" class="size-5" />
            <span
              v-if="count"
              class="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full text-[10px] font-semibold"
            >
              {{ count }}
            </span>
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent align="end" class="w-[22rem] p-0">
          <div class="flex items-center justify-between border-b px-4 py-3">
            <h2 class="text-sm font-semibold">Shopping cart</h2>
            <span class="text-muted-foreground text-xs">{{ count }} items</span>
          </div>

          <ul v-if="items.length" class="max-h-72 divide-y overflow-y-auto px-4">
            <li v-for="item in items" :key="item.id" class="flex gap-3 py-3">
              <img
                :src="item.image"
                :alt="item.name"
                class="bg-muted size-14 shrink-0 rounded-md object-cover"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">{{ item.name }}</p>
                <p class="text-muted-foreground text-xs">
                  {{ item.variant }} · Qty {{ item.quantity }}
                </p>
                <p class="mt-1 text-sm font-semibold tabular-nums">
                  {{ money.format(item.price * item.quantity) }}
                </p>
              </div>
              <UiButton
                variant="ghost"
                size="icon-xs"
                class="text-muted-foreground"
                :aria-label="`Remove ${item.name}`"
                @click="remove(item.id)"
              >
                <Icon name="lucide:x" />
              </UiButton>
            </li>
          </ul>
          <p v-else class="text-muted-foreground px-4 py-10 text-center text-sm">
            Your cart is empty.
          </p>

          <div v-if="items.length" class="space-y-3 border-t p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Subtotal</span>
              <span class="font-semibold tabular-nums" aria-live="polite">
                {{ money.format(subtotal) }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <UiButton variant="outline">View cart</UiButton>
              <UiButton>Checkout</UiButton>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>
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
      /** Whether the popover starts open. */
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
        {
          id: 13,
          name: "Soy Candle",
          variant: "Amber",
          price: 34,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=400&q=80",
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
