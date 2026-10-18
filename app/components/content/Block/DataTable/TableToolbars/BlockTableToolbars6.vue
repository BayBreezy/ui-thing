<template>
  <!--
    Table toolbar with density toggle, page size and export
    Features: Comfortable and compact density toggle group, rows per page select, export button, density aware cell padding and a showing x of y footer
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <UiToggleGroup
          v-model="density"
          type="single"
          variant="outline"
          size="sm"
          aria-label="Row density"
        >
          <UiToggleGroupItem value="comfortable" aria-label="Comfortable rows">
            <Icon name="lucide:rows-2" class="size-4" />
          </UiToggleGroupItem>
          <UiToggleGroupItem value="compact" aria-label="Compact rows">
            <Icon name="lucide:rows-4" class="size-4" />
          </UiToggleGroupItem>
        </UiToggleGroup>
        <UiSelect v-model="perPage">
          <UiSelectTrigger class="w-32" size="sm" aria-label="Rows per page">
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="size in ['5', '10']" :key="size" :value="size">
              {{ size }} per page
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
        <UiButton variant="outline" size="sm" @click="useSonner.success('Exported products.csv')">
          <Icon name="lucide:download" class="size-4" />
          Export
        </UiButton>
      </div>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Product</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Category</UiTableHead>
            <UiTableHead class="text-right">Units sold</UiTableHead>
            <UiTableHead class="text-right">Revenue</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="product in visible" :key="product.name">
            <UiTableCell :class="density === 'compact' ? 'py-1.5' : 'py-4'" class="font-medium">
              {{ product.name }}
            </UiTableCell>
            <UiTableCell
              :class="density === 'compact' ? 'py-1.5' : 'py-4'"
              class="text-muted-foreground hidden sm:table-cell"
            >
              {{ product.category }}
            </UiTableCell>
            <UiTableCell
              :class="density === 'compact' ? 'py-1.5' : 'py-4'"
              class="text-right tabular-nums"
            >
              {{ product.units }}
            </UiTableCell>
            <UiTableCell
              :class="density === 'compact' ? 'py-1.5' : 'py-4'"
              class="text-right tabular-nums"
            >
              {{ money.format(product.units * product.price) }}
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
      Showing {{ visible.length }} of {{ products.length }} products
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = { name: string; category: string; units: number; price: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      products?: Product[];
    }>(),
    {
      title: "Best sellers",
      description: "Tune how much you see at once with density and page size.",
      products: () => [
        { name: "Bomber Jacket", category: "Outerwear", units: 312, price: 138 },
        { name: "Classic Tee", category: "Tops", units: 1204, price: 32 },
        { name: "Canvas Tote", category: "Accessories", units: 689, price: 28 },
        { name: "Crew Sweatshirt", category: "Tops", units: 457, price: 58 },
        { name: "Stoneware Mug", category: "Home", units: 233, price: 24 },
        { name: "Wool Beanie", category: "Accessories", units: 398, price: 26 },
        { name: "Linen Shirt", category: "Tops", units: 176, price: 72 },
        { name: "Denim Jacket", category: "Outerwear", units: 142, price: 118 },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const density = ref<"comfortable" | "compact">("comfortable");
  const perPage = ref("5");

  const visible = computed(() => props.products.slice(0, Number(perPage.value)));
</script>
