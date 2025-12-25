<template>
  <div class="w-full space-y-4">
    <div class="flex items-center gap-2">
      <UiButton :disabled="pending" @click="refreshData">
        <Icon name="lucide:refresh-cw" class="size-4" :class="{ 'animate-spin': pending }" />
        Refresh Data
      </UiButton>
    </div>

    <UiTanStackTable
      :data="data"
      :columns="columns"
      :loading="pending"
      :initial-page-size="5"
      :page-size-options="[5, 10, 50, 100]"
    >
      <template #loading="{ loading }">
        <div v-if="loading" class="flex items-center gap-2 px-4 py-2 text-sm text-primary">
          <Icon name="lucide:loader-2" class="size-4 animate-spin" />
          <span>Fetching data...</span>
        </div>
      </template>
    </UiTanStackTable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";

  interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
  }

  const refreshTrigger = ref(0);

  const fetchProducts = async (): Promise<Product[]> => {
    // Simulate network delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return Array.from({ length: 12 }, () => ({
      id: faker.number.int({ min: 1000, max: 9999 }),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
      stock: faker.number.int({ min: 0, max: 100 }),
    }));
  };

  const { data, pending } = await useAsyncData("products", () => fetchProducts(), {
    watch: [refreshTrigger],
    default: () => [],
  });

  const refreshData = () => {
    refreshTrigger.value++;
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => {
        const category = getValue() as string;
        // assign a random color based on the category string
        const color = faker.color.rgb({ format: "hex" });
        const colorLight = `${color}33`; // add opacity for light bg

        return h(
          "span",
          {
            class: `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium`,
            style: {
              backgroundColor: colorLight,
              color: color,
            },
          },
          category
        );
      },
    },
    {
      accessorKey: "price",
      header: () => h("div", { class: "text-right" }, "Price"),
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return h(
          "div",
          { class: "text-right font-medium" },
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
        );
      },
    },
    {
      accessorKey: "stock",
      header: () => h("div", { class: "text-right" }, "Stock"),
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return h(
          "div",
          {
            class: `text-right font-medium ${stock < 20 ? "text-red-600 dark:text-red-400" : ""}`,
          },
          stock
        );
      },
    },
  ];
</script>
