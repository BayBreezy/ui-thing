<template>
  <!--
    Order history table with search and filters
    Features: Search by order number or product, status filter, sortable date column with aria sort, stacked product thumbnails, color coded status badges, view and reorder actions, pagination and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Order history</h1>
        <p class="text-muted-foreground mt-2">
          Check the status of recent orders and reorder favorites.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <div class="relative">
          <UiLabel for="order-search" class="sr-only">Search orders</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            id="order-search"
            v-model="search"
            placeholder="Search orders"
            class="pl-9 sm:w-60"
          />
        </div>
        <UiSelect v-model="status">
          <UiSelectTrigger class="sm:w-40" aria-label="Filter by status">
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="all">All statuses</UiSelectItem>
            <UiSelectItem v-for="(info, key) in statuses" :key="key" :value="key">
              {{ info.label }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Order</UiTableHead>
            <UiTableHead :aria-sort="direction === 'desc' ? 'descending' : 'ascending'">
              <button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="direction = direction === 'desc' ? 'asc' : 'desc'"
              >
                Date
                <Icon
                  :name="direction === 'desc' ? 'lucide:arrow-down' : 'lucide:arrow-up'"
                  class="size-3.5"
                />
              </button>
            </UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Items</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Total</UiTableHead>
            <UiTableHead class="w-0"><span class="sr-only">Actions</span></UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="order in paged" :key="order.id">
            <UiTableCell class="font-medium">{{ order.id }}</UiTableCell>
            <UiTableCell class="text-muted-foreground whitespace-nowrap">
              {{ formatDate(order.placedOn) }}
            </UiTableCell>
            <UiTableCell class="hidden sm:table-cell">
              <div class="flex items-center -space-x-2">
                <img
                  v-for="item in order.items.slice(0, 3)"
                  :key="item.name"
                  :src="item.image"
                  :alt="item.name"
                  class="bg-muted ring-background size-8 rounded-full object-cover ring-2"
                />
                <span
                  v-if="order.items.length > 3"
                  class="bg-muted ring-background grid size-8 place-items-center rounded-full text-xs ring-2"
                >
                  +{{ order.items.length - 3 }}
                </span>
              </div>
            </UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="statuses[order.status].color" shape="pill">
                {{ statuses[order.status].label }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-right tabular-nums">{{
              money.format(order.total)
            }}</UiTableCell>
            <UiTableCell>
              <div class="flex justify-end gap-1">
                <UiButton variant="ghost" size="sm">View</UiButton>
                <UiButton
                  v-if="order.status === 'delivered'"
                  variant="outline"
                  size="sm"
                  class="hidden md:inline-flex"
                >
                  Reorder
                </UiButton>
              </div>
            </UiTableCell>
          </UiTableRow>
          <UiTableRow v-if="!paged.length">
            <UiTableCell colspan="6" class="text-muted-foreground py-12 text-center">
              No orders match your search.
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>

    <UiPagination
      v-if="filtered.length > perPage"
      v-model:page="page"
      :total="filtered.length"
      :items-per-page="perPage"
      :sibling-count="1"
      class="mt-8"
    />
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "processing" | "shipped" | "delivered" | "returned" | "cancelled";

  type Order = {
    id: string;
    placedOn: string;
    status: Status;
    total: number;
    address: string;
    items: { name: string; variant: string; price: number; quantity: number; image: string }[];
  };

  const props = withDefaults(
    defineProps<{
      orders?: Order[];
      perPage?: number;
    }>(),
    {
      perPage: 4,
      orders: () => [
        {
          id: "AR-48213",
          placedOn: "2026-10-14",
          status: "shipped",
          total: 248.4,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Bomber Jacket",
              variant: "Rust · M",
              price: 138,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80",
            },
            {
              name: "Classic Tee",
              variant: "White · L",
              price: 32,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            },
            {
              name: "Canvas Tote",
              variant: "Natural",
              price: 28,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-47602",
          placedOn: "2026-09-28",
          status: "delivered",
          total: 122.48,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Crew Sweatshirt",
              variant: "White · M",
              price: 58,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80",
            },
            {
              name: "Stoneware Mug",
              variant: "White",
              price: 24,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-47011",
          placedOn: "2026-09-02",
          status: "delivered",
          total: 214.92,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Studio Over-Ear",
              variant: "Black",
              price: 199,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-46188",
          placedOn: "2026-08-11",
          status: "delivered",
          total: 81.44,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Soy Candle",
              variant: "Amber",
              price: 34,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-45530",
          placedOn: "2026-07-19",
          status: "returned",
          total: 118.8,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Corduroy Dress",
              variant: "Burgundy · S",
              price: 110,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
        {
          id: "AR-44921",
          placedOn: "2026-06-30",
          status: "cancelled",
          total: 128.52,
          address: "123 Market Street, San Francisco CA 94103",
          items: [
            {
              name: "Trail Backpack",
              variant: "Olive",
              price: 119,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=200&q=80",
            },
          ],
        },
      ],
    }
  );

  const statuses = {
    processing: { label: "Processing", color: "amber" },
    shipped: { label: "Shipped", color: "blue" },
    delivered: { label: "Delivered", color: "green" },
    returned: { label: "Returned", color: "slate" },
    cancelled: { label: "Cancelled", color: "red" },
  } as const;

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const search = ref("");
  const status = ref("all");
  const direction = ref<"asc" | "desc">("desc");
  const page = ref(1);

  const filtered = computed(() => {
    const query = search.value.trim().toLowerCase();
    return props.orders
      .filter((order) => status.value === "all" || order.status === status.value)
      .filter(
        (order) =>
          !query ||
          order.id.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query))
      )
      .sort((a, b) =>
        direction.value === "desc"
          ? b.placedOn.localeCompare(a.placedOn)
          : a.placedOn.localeCompare(b.placedOn)
      );
  });

  const paged = computed(() =>
    filtered.value.slice((page.value - 1) * props.perPage, page.value * props.perPage)
  );

  watch([search, status, direction], () => (page.value = 1));

  function formatDate(value: string) {
    return dateFormat.format(new Date(`${value}T00:00:00`));
  }
</script>
