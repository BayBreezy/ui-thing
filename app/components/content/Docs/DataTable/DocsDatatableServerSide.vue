<template>
  <div class="space-y-3">
    <div class="flex items-start justify-between gap-3">
      <p class="text-muted-foreground text-xs break-all">
        Last request:
        <span class="font-mono">{{ lastRequest || "waiting for the first request..." }}</span>
      </p>
      <UiButton size="sm" variant="outline" icon="lucide:refresh-cw" @click="reload">
        Reload
      </UiButton>
    </div>
    <p v-if="errorMessage" role="alert" class="text-destructive text-sm">{{ errorMessage }}</p>
    <div class="rounded-lg border p-4">
      <UiDatatable
        class="compact hover order-column row-border stripe display"
        :options="options"
        @ready="tableRef = $event"
      >
        <template #product="{ rowData }: { rowData: Product }">
          <div class="flex items-center gap-3">
            <img
              :src="rowData.thumbnail"
              :alt="rowData.title"
              class="bg-muted size-10 rounded-md object-cover"
              loading="lazy"
            />
            <span class="font-medium">{{ rowData.title }}</span>
          </div>
        </template>
      </UiDatatable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Api, AjaxData, Config } from "datatables.net";

  type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
  };
  type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

  const ENDPOINT = "https://dummyjson.com/products";

  const tableRef = shallowRef<Api<any> | undefined>();
  const lastRequest = ref("");
  const errorMessage = ref("");

  // The API only reports a total for the query it ran, so remember the size of the whole list
  let unfilteredTotal = 0;
  let controller: AbortController | undefined;

  // With `serverSide: true`, DataTables calls this function every time the user searches, sorts,
  // changes page or changes the page length. Translate the request into your API's query string,
  // then hand the rows back with the two totals DataTables needs for its info text and paging.
  const ajax = async (data: AjaxData, callback: (json: object) => void) => {
    // A newer request replaces any request that is still in flight
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    const term = data.search?.value.trim();
    const order = data.order?.[0];
    const sortBy = order ? data.columns?.[order.column]?.data : undefined;

    const params: Record<string, string> = {
      limit: String(data.length),
      skip: String(data.start),
    };
    if (term) params.q = term;
    if (order && sortBy) {
      params.sortBy = String(sortBy);
      params.order = order.dir;
    }

    // This API has a separate endpoint for searching
    const url = `${ENDPOINT}${term ? "/search" : ""}?${new URLSearchParams(params)}`;
    lastRequest.value = `GET ${url}`;
    errorMessage.value = "";

    try {
      const res = await $fetch<ProductsResponse>(url, { signal });
      if (!term) unfilteredTotal = res.total;
      callback({
        // Always send back the `draw` counter so DataTables can drop out of date responses
        draw: data.draw,
        data: res.products,
        recordsTotal: unfilteredTotal || res.total,
        recordsFiltered: res.total,
      });
    } catch {
      // An aborted request was replaced by a newer one, so there is nothing to show
      if (signal.aborted) return;
      errorMessage.value = "Could not load the products. Check your connection and try again.";
      callback({ draw: data.draw, data: [], recordsTotal: 0, recordsFiltered: 0 });
    }
  };

  const options: Config = {
    serverSide: true,
    processing: true,
    // Wait for the user to stop typing before sending a search
    searchDelay: 400,
    pageLength: 10,
    lengthMenu: [10, 25, 50],
    order: [],
    language: { search: "", searchPlaceholder: "Search products..." },
    ajax,
    columns: [
      // `data` is the field name that is sent to the API as `sortBy`
      { title: "Product", data: "title", render: "#product" },
      { title: "Category", data: "category" },
      {
        title: "Price",
        data: "price",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
      { title: "Rating", data: "rating", render: (d: number) => d.toFixed(1) },
      { title: "Stock", data: "stock" },
    ],
  };

  // Send the current request again. `false` keeps the current page.
  const reload = () => tableRef.value?.ajax.reload(undefined, false);
</script>
