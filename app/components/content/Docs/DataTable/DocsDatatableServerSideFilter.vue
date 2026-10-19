<template>
  <div class="space-y-3">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="sm:w-64">
        <UiLabel for="datatable-category" class="mb-2">Category</UiLabel>
        <UiNativeSelect id="datatable-category" v-model="category">
          <option value="">All categories</option>
          <option v-for="item in categories" :key="item" :value="item">
            {{ formatCategory(item) }}
          </option>
        </UiNativeSelect>
      </div>
      <p class="text-muted-foreground text-xs break-all sm:max-w-sm sm:text-right">
        Last request:
        <span class="font-mono">{{ lastRequest || "waiting for the first request..." }}</span>
      </p>
    </div>
    <p v-if="errorMessage" role="alert" class="text-destructive text-sm">{{ errorMessage }}</p>
    <div class="rounded-lg border p-4">
      <UiDatatable :options="options" @ready="tableRef = $event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Api, AjaxData, Config } from "datatables.net";

  type Product = {
    id: number;
    title: string;
    brand?: string;
    price: number;
    rating: number;
  };
  type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

  const ENDPOINT = "https://dummyjson.com/products";

  const { data: categories } = await useAsyncData(
    "datatableCategories",
    () => $fetch<string[]>(`${ENDPOINT}/category-list`),
    { default: () => [] }
  );
  const formatCategory = (value: string) =>
    value.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase());

  const tableRef = shallowRef<Api<any> | undefined>();
  const category = ref("");
  const lastRequest = ref("");
  const errorMessage = ref("");

  let unfilteredTotal = 0;
  let controller: AbortController | undefined;

  const ajax = async (data: AjaxData, callback: (json: object) => void) => {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    const order = data.order?.[0];
    const sortBy = order ? data.columns?.[order.column]?.data : undefined;
    const params: Record<string, string> = {
      limit: String(data.length),
      skip: String(data.start),
    };
    if (order && sortBy) {
      params.sortBy = String(sortBy);
      params.order = order.dir;
    }

    // Anything outside the table can feed the request. Here it is the selected category, which
    // changes the endpoint. Read it when the request is made so it is always current.
    const path = category.value ? `/category/${category.value}` : "";
    const url = `${ENDPOINT}${path}?${new URLSearchParams(params)}`;
    lastRequest.value = `GET ${url}`;
    errorMessage.value = "";

    try {
      const res = await $fetch<ProductsResponse>(url, { signal });
      if (!category.value) unfilteredTotal = res.total;
      callback({
        draw: data.draw,
        data: res.products,
        recordsTotal: unfilteredTotal || res.total,
        recordsFiltered: res.total,
      });
    } catch {
      if (signal.aborted) return;
      errorMessage.value = "Could not load the products. Check your connection and try again.";
      callback({ draw: data.draw, data: [], recordsTotal: 0, recordsFiltered: 0 });
    }
  };

  // When the filter changes, ask DataTables to send the request again. By default it also goes back
  // to the first page, which is what you want after a filter changes.
  watch(category, () => {
    tableRef.value?.ajax.reload();
  });

  const options: Config = {
    serverSide: true,
    processing: true,
    pageLength: 10,
    lengthMenu: [5, 10, 25],
    order: [],
    // This API cannot search inside a category, so leave the search box out
    layout: { topStart: "pageLength", topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    ajax,
    columns: [
      { title: "Product", data: "title" },
      { title: "Brand", data: "brand", orderable: false, defaultContent: "-" },
      {
        title: "Price",
        data: "price",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
      { title: "Rating", data: "rating", render: (d: number) => d.toFixed(1) },
    ],
  };
</script>
