<template>
  <!--
    API request log table
    Features: Monospace paths, colored HTTP method badges, status code colors, latency bars, method filter toggle group and a live request count
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiToggleGroup v-model="method" type="single" variant="outline" aria-label="Filter by method">
        <UiToggleGroupItem v-for="item in methods" :key="item" :value="item">
          {{ item }}
        </UiToggleGroupItem>
      </UiToggleGroup>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable class="font-mono text-xs">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Method</UiTableHead>
            <UiTableHead>Path</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Latency</UiTableHead>
            <UiTableHead class="hidden text-right md:table-cell">Time</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="log in rows" :key="log.id">
            <UiTableCell>
              <UiBadge variant="soft" :color="methodColors[log.method]" class="font-mono">
                {{ log.method }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="max-w-48 truncate sm:max-w-none">{{ log.path }}</UiTableCell>
            <UiTableCell :class="statusClass(log.status)" class="font-semibold">
              {{ log.status }}
            </UiTableCell>
            <UiTableCell class="hidden sm:table-cell">
              <div class="flex items-center gap-2">
                <div class="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                  <div
                    class="bg-primary h-full rounded-full"
                    :style="{ width: `${Math.min(100, (log.latency / 600) * 100)}%` }"
                  />
                </div>
                <span class="text-muted-foreground w-14 tabular-nums">{{ log.latency }} ms</span>
              </div>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden text-right md:table-cell">
              {{ log.time }}
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="5">No requests for this method.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
      {{ rows.length }} requests in the last hour
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Method = "GET" | "POST" | "PUT" | "DELETE";

  type Log = {
    id: string;
    method: Method;
    path: string;
    status: number;
    latency: number;
    time: string;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      logs?: Log[];
    }>(),
    {
      title: "Request logs",
      description: "Recent traffic hitting your public API.",
      logs: () => [
        {
          id: "l1",
          method: "GET",
          path: "/v1/customers",
          status: 200,
          latency: 84,
          time: "14:32:09",
        },
        {
          id: "l2",
          method: "POST",
          path: "/v1/orders",
          status: 201,
          latency: 212,
          time: "14:31:47",
        },
        {
          id: "l3",
          method: "GET",
          path: "/v1/orders/ord_8231",
          status: 404,
          latency: 41,
          time: "14:31:12",
        },
        {
          id: "l4",
          method: "PUT",
          path: "/v1/customers/cus_104",
          status: 200,
          latency: 163,
          time: "14:30:58",
        },
        {
          id: "l5",
          method: "POST",
          path: "/v1/payments",
          status: 500,
          latency: 540,
          time: "14:30:21",
        },
        {
          id: "l6",
          method: "DELETE",
          path: "/v1/webhooks/wh_77",
          status: 204,
          latency: 58,
          time: "14:29:40",
        },
        {
          id: "l7",
          method: "GET",
          path: "/v1/invoices?limit=20",
          status: 200,
          latency: 97,
          time: "14:29:02",
        },
      ],
    }
  );

  const methods = ["GET", "POST", "PUT", "DELETE"] as const;
  const methodColors = { GET: "green", POST: "blue", PUT: "amber", DELETE: "red" } as const;

  const method = ref<Method | undefined>();

  const rows = computed(() =>
    method.value ? props.logs.filter((log) => log.method === method.value) : props.logs
  );

  function statusClass(status: number) {
    if (status >= 500) return "text-red-600 dark:text-red-400";
    if (status >= 400) return "text-amber-600 dark:text-amber-400";
    return "text-green-600 dark:text-green-400";
  }
</script>
