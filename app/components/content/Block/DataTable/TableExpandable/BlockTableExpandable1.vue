<template>
  <!--
    Orders table with expandable detail rows
    Features: Chevron toggle with aria expanded and aria controls, a detail row with line items and totals, expand all and collapse all buttons, only the toggled rows change
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="flex gap-2">
        <UiButton variant="outline" size="sm" @click="open = orders.map((order) => order.id)">
          Expand all
        </UiButton>
        <UiButton variant="outline" size="sm" :disabled="!open.length" @click="open = []">
          Collapse all
        </UiButton>
      </div>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-10"><span class="sr-only">Expand</span></UiTableHead>
            <UiTableHead>Order</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Customer</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Total</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="order in orders" :key="order.id">
            <UiTableRow>
              <UiTableCell>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  :aria-expanded="open.includes(order.id)"
                  :aria-controls="`details-${order.id}`"
                  :aria-label="`${open.includes(order.id) ? 'Collapse' : 'Expand'} ${order.id}`"
                  @click="toggle(order.id)"
                >
                  <Icon
                    name="lucide:chevron-right"
                    class="size-4 transition-transform"
                    :class="open.includes(order.id) ? 'rotate-90' : ''"
                  />
                </UiButton>
              </UiTableCell>
              <UiTableCell class="font-medium">{{ order.id }}</UiTableCell>
              <UiTableCell class="hidden sm:table-cell">{{ order.customer }}</UiTableCell>
              <UiTableCell>
                <UiBadge variant="soft" :color="colors[order.status]" shape="pill">
                  {{ order.status }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell class="text-right tabular-nums">
                {{ money.format(orderTotal(order)) }}
              </UiTableCell>
            </UiTableRow>
            <UiTableRow
              v-if="open.includes(order.id)"
              :id="`details-${order.id}`"
              class="bg-muted/40 hover:bg-muted/40"
            >
              <UiTableCell colspan="5" class="px-4 py-4 sm:pl-14">
                <ul class="divide-y text-sm">
                  <li
                    v-for="line in order.lines"
                    :key="line.name"
                    class="flex items-center justify-between gap-4 py-2"
                  >
                    <span>
                      {{ line.name }}
                      <span class="text-muted-foreground">× {{ line.quantity }}</span>
                    </span>
                    <span class="tabular-nums">{{ money.format(line.price * line.quantity) }}</span>
                  </li>
                </ul>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Processing" | "Shipped" | "Delivered";

  type Order = {
    id: string;
    customer: string;
    status: Status;
    lines: { name: string; quantity: number; price: number }[];
  };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      orders?: Order[];
    }>(),
    {
      title: "Orders",
      description: "Open a row to see what is inside the order.",
      orders: () => [
        {
          id: "AR-48213",
          customer: "Hannah Lee",
          status: "Shipped",
          lines: [
            { name: "Bomber Jacket", quantity: 1, price: 138 },
            { name: "Classic Tee", quantity: 2, price: 32 },
            { name: "Canvas Tote", quantity: 1, price: 28 },
          ],
        },
        {
          id: "AR-48190",
          customer: "Marco Rossi",
          status: "Processing",
          lines: [{ name: "Stoneware Mug", quantity: 4, price: 24 }],
        },
        {
          id: "AR-47602",
          customer: "Priya Nair",
          status: "Delivered",
          lines: [
            { name: "Crew Sweatshirt", quantity: 1, price: 58 },
            { name: "Wool Beanie", quantity: 1, price: 26 },
          ],
        },
      ],
    }
  );

  const colors = { Processing: "amber", Shipped: "blue", Delivered: "green" } as const;
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const open = ref<string[]>([]);

  function toggle(id: string) {
    open.value = open.value.includes(id)
      ? open.value.filter((item) => item !== id)
      : [...open.value, id];
  }

  function orderTotal(order: Order) {
    return order.lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  }
</script>
