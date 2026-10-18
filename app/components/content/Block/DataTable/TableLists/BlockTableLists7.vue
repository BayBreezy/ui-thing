<template>
  <!--
    Product inventory table with stock levels
    Features: Product thumbnail and SKU cell, stock progress bar, low stock and out of stock badges, price column and a low stock summary alert
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiButton variant="outline" @click="useSonner.info('Open your restock form here')">
        <Icon name="lucide:package-plus" class="size-4" />
        Restock
      </UiButton>
    </div>

    <UiAlert
      v-if="lowCount"
      class="mt-8"
      variant="warning"
      icon="lucide:triangle-alert"
      :title="`${lowCount} products need restocking`"
      description="These items are running low or sold out. Reorder them to avoid missed sales."
    />

    <div class="mt-6 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Product</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Stock</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Price</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="product in products" :key="product.sku">
            <UiTableCell>
              <div class="flex items-center gap-3">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="bg-muted size-11 shrink-0 rounded-lg object-cover"
                />
                <div class="min-w-0">
                  <p class="truncate font-medium">{{ product.name }}</p>
                  <p class="text-muted-foreground font-mono text-xs">{{ product.sku }}</p>
                </div>
              </div>
            </UiTableCell>
            <UiTableCell class="hidden w-56 sm:table-cell">
              <div class="flex items-center gap-3">
                <UiProgress
                  :model-value="Math.min(100, (product.stock / product.capacity) * 100)"
                  class="h-1.5"
                  :aria-label="`${product.name} stock level`"
                />
                <span class="text-muted-foreground w-10 text-xs tabular-nums">
                  {{ product.stock }}
                </span>
              </div>
            </UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="stockState(product).color" shape="pill">
                {{ stockState(product).label }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-right tabular-nums">
              {{ money.format(product.price) }}
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = {
    sku: string;
    name: string;
    image: string;
    stock: number;
    capacity: number;
    price: number;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      products?: Product[];
    }>(),
    {
      title: "Inventory",
      description: "Stock on hand across your warehouses.",
      products: () => [
        {
          sku: "JKT-RST-M",
          name: "Bomber Jacket",
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=160&q=80",
          stock: 42,
          capacity: 60,
          price: 138,
        },
        {
          sku: "TEE-WHT-L",
          name: "Classic Tee",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=160&q=80",
          stock: 8,
          capacity: 120,
          price: 32,
        },
        {
          sku: "TOT-NAT-01",
          name: "Canvas Tote",
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=160&q=80",
          stock: 0,
          capacity: 80,
          price: 28,
        },
        {
          sku: "SWT-WHT-M",
          name: "Crew Sweatshirt",
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=160&q=80",
          stock: 64,
          capacity: 80,
          price: 58,
        },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  function stockState(product: Product) {
    if (product.stock === 0) return { label: "Out of stock", color: "red" } as const;
    if (product.stock / product.capacity < 0.15)
      return { label: "Low stock", color: "amber" } as const;
    return { label: "In stock", color: "green" } as const;
  }

  const lowCount = computed(
    () => props.products.filter((product) => stockState(product).label !== "In stock").length
  );
</script>
