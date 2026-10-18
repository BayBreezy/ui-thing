<template>
  <!--
    Table with click to edit cells
    Features: Editable name and price cells built on Editable, enter or blur saves, escape cancels, visible edit affordance on hover and a live inventory value total
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Product</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">SKU</UiTableHead>
            <UiTableHead class="w-36">Price</UiTableHead>
            <UiTableHead class="w-28 text-right">Stock</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="product in rows" :key="product.sku">
            <UiTableCell>
              <UiEditable v-model="product.name" submit-mode="both" class="-mx-2">
                <UiEditableArea>
                  <UiEditablePreview
                    class="hover:bg-muted focus-visible:ring-ring/50 block cursor-text rounded-md px-2 py-1 font-medium outline-none focus-visible:ring-[3px]"
                  />
                  <UiEditableInput as-child>
                    <UiInput class="h-8" :aria-label="`Name of ${product.name}`" />
                  </UiEditableInput>
                </UiEditableArea>
              </UiEditable>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden font-mono text-xs sm:table-cell">
              {{ product.sku }}
            </UiTableCell>
            <UiTableCell>
              <UiEditable
                :model-value="String(product.price)"
                submit-mode="both"
                class="-mx-2"
                @update:model-value="setPrice(product, $event)"
              >
                <UiEditableArea>
                  <UiEditablePreview
                    class="hover:bg-muted focus-visible:ring-ring/50 block cursor-text rounded-md px-2 py-1 tabular-nums outline-none focus-visible:ring-[3px]"
                  >
                    {{ money.format(product.price) }}
                  </UiEditablePreview>
                  <UiEditableInput as-child>
                    <UiInput
                      type="number"
                      min="0"
                      step="0.01"
                      class="h-8"
                      :aria-label="`Price of ${product.name}`"
                    />
                  </UiEditableInput>
                </UiEditableArea>
              </UiEditable>
            </UiTableCell>
            <UiTableCell class="text-right tabular-nums">{{ product.stock }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
        <UiTableFooter>
          <UiTableRow>
            <UiTableCell colspan="3" class="font-medium">Inventory value</UiTableCell>
            <UiTableCell class="text-right font-medium tabular-nums">
              {{ money.format(total) }}
            </UiTableCell>
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
    <p class="text-muted-foreground mt-3 text-sm">Click a name or price to edit it.</p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = { sku: string; name: string; price: number; stock: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      products?: Product[];
    }>(),
    {
      title: "Price list",
      description: "Edit values right where you read them.",
      products: () => [
        { sku: "JKT-RST-M", name: "Bomber Jacket", price: 138, stock: 42 },
        { sku: "TEE-WHT-L", name: "Classic Tee", price: 32, stock: 120 },
        { sku: "TOT-NAT-01", name: "Canvas Tote", price: 28, stock: 80 },
        { sku: "SWT-WHT-M", name: "Crew Sweatshirt", price: 58, stock: 64 },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const rows = ref<Product[]>(props.products.map((product) => ({ ...product })));

  const total = computed(() =>
    rows.value.reduce((sum, product) => sum + product.price * product.stock, 0)
  );

  function setPrice(product: Product, value: string | undefined) {
    const next = Number(value);
    if (Number.isFinite(next) && next >= 0) product.price = next;
  }
</script>
