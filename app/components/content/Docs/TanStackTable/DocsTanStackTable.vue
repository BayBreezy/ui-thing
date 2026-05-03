<template>
  <div>
    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <UiInput
        v-if="tableRef"
        v-model="tableRef!.globalFilter"
        type="search"
        placeholder="Search"
        class="w-full md:w-96"
      />
      <div class="flex flex-col gap-x-3 gap-y-5 md:flex-row">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="outline">
              <span>Download</span>
              <Icon name="lucide:cloud-download" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent :side-offset="10" align="start">
            <UiDropdownMenuLabel> Export Data </UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem
              title="Export All"
              icon="lucide:file-spreadsheet"
              @select="exportCsv('all')"
            />
            <UiDropdownMenuItem
              title="Export Current Page"
              icon="lucide:file-spreadsheet"
              @select="exportCsv('page')"
            />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="outline">
              <span>View</span>
              <Icon name="lucide:chevron-down" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
            <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuGroup>
              <UiDropdownMenuCheckboxItem
                v-for="column in table?.getAllColumns().filter((column) => column.getCanHide())"
                :key="column.id"
                :model-value="column.getIsVisible()"
                @update:model-value="column.toggleVisibility()"
              >
                <span class="text-sm capitalize">{{ column?.id }}</span>
              </UiDropdownMenuCheckboxItem>
            </UiDropdownMenuGroup>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>

    <div class="mt-5 overflow-hidden rounded-lg border">
      <UiTanStackTable
        ref="tableRef"
        :data="data"
        :loading="pending"
        :columns="columns"
        :initial-page-size="5"
        :page-size-options="[5, 10, 20, 50, 100]"
        @ready="table = $event"
      >
        <template #empty>
          <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
            <Icon name="lucide:database" class="text-muted-foreground h-12 w-12" />
            <span class="mt-2">No data available.</span>
          </div>
        </template>
        <template #actions-cell="{ row }">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm">
                <Icon name="lucide:ellipsis-vertical" class="size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent side="bottom" align="end">
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem
                  title="View Details"
                  icon="lucide:square-arrow-out-up-right"
                  @select="
                    selectedPayment = row.original;
                    showDetails = true;
                  "
                />
                <UiDropdownMenuItem
                  title="Refund Payment"
                  icon="lucide:banknote-arrow-down"
                  @select="
                    useSonner.info('Initiate Refund', {
                      description: `Would you like to refund payment ID: ${row.original.id}?`,
                      action: {
                        label: 'Refund Now',
                        onClick: () => {
                          useSonner.success('Refunded!', {
                            description: `Payment ID: ${row.original.id} has been refunded.`,
                          });
                        },
                      },
                    })
                  "
                />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  title="Delete Payment"
                  icon="lucide:trash"
                  variant="destructive"
                  @select="
                    useSonner.error('Initiate Deletion', {
                      description: `Are you sure you want to delete payment ID: ${row.original.id}?`,
                      action: {
                        label: 'Delete Now',
                        onClick: () => {
                          useSonner.success('Deleted!', {
                            description: `Payment ID: ${row.original.id} has been deleted.`,
                            richColors: true,
                          });
                        },
                      },
                    })
                  "
                />
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </template>
      </UiTanStackTable>
    </div>

    <UiSheet v-model:open="showDetails">
      <UiSheetContent class="w-full sm:w-[500px]" side="right">
        <UiSheetHeader>
          <UiSheetTitle>Payment Details</UiSheetTitle>
          <UiSheetDescription> View and manage payment information </UiSheetDescription>
        </UiSheetHeader>

        <div v-if="selectedPayment" class="space-y-6 p-6">
          <UiVeeInput label="Payment ID" disabled :model-value="selectedPayment.id" readonly />
          <UiVeeInput v-model="selectedPayment.email" label="Email" readonly type="email" />
          <UiVeeCurrencyInput label="Amount" :model-value="`${selectedPayment.amount}`" readonly />

          <div class="space-y-2">
            <label class="text-sm font-medium">Status</label>
            <div class="flex items-center gap-2">
              <UiBadge :variant="getStatusVariant(selectedPayment.status)" class="capitalize">
                {{ selectedPayment.status }}
              </UiBadge>
            </div>
          </div>
        </div>

        <UiSheetFooter>
          <UiButton variant="outline" @click="showDetails = false">Close</UiButton>
          <UiButton @click="showDetails = false">Done</UiButton>
        </UiSheetFooter>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, Table } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  import type { UiTanStackTable } from "#components";

  const tableRef = useTemplateRef("tableRef");
  const table = ref<Table<Payment> | null>(null);
  const showDetails = ref(false);
  const selectedPayment = ref<Payment | null>(null);

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const { data, pending } = await useAsyncData<Payment[]>(
    async () => {
      // Simulate fetching data
      await promiseTimeout(1000);
      // create 100 fake payment records
      return Array.from({ length: 100 }, () => ({
        id: faker.string.alphanumeric(10),
        amount: faker.number.int({ min: 10, max: 1000 }),
        status: faker.helpers.arrayElement(["pending", "processing", "success", "failed"]) as
          | "pending"
          | "processing"
          | "success"
          | "failed",
        email: faker.internet.email().toLowerCase(),
      }));
    },
    { default: () => [] }
  );

  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "id", header: "ID", enableHiding: true },
    {
      accessorKey: "amount",
      header: "Amount",
      enableHiding: true,
      enableSorting: true,
      cell: ({ row }) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(row.original.amount);
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return h(resolveComponent("UiBadge"), { variant: "outline", class: "capitalize" }, () => [
          row.original.status,
        ]);
      },
      enableHiding: true,
    },
    { accessorKey: "email", header: "Email", enableHiding: true },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
    },
  ];

  function exportCsv(mode: "all" | "page") {
    if (!table.value) return;

    // Get rows based on mode
    const rows =
      mode === "all" ? table.value.getFilteredRowModel().rows : table.value.getRowModel().rows;

    if (!rows.length) {
      useSonner.info("No data to export", {
        description: "Please ensure there is data to export.",
      });
      return;
    }

    // Get visible columns, excluding actions
    const columns = table.value.getVisibleLeafColumns().filter((col) => col.id !== "actions");

    // Build header row
    const header = columns.map((col) => {
      const headerText = typeof col.columnDef.header === "string" ? col.columnDef.header : col.id;
      return escapeCsvValue(String(headerText));
    });

    // Build data rows
    const dataRows = rows.map((row) =>
      columns.map((col) => {
        const value = row.getValue(col.id);
        return escapeCsvValue(value);
      })
    );

    // Combine and create CSV
    const csv = [header, ...dataRows].map((r) => r.join(",")).join("\n");

    // Create blob and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payments-${mode === "all" ? "all" : "page"}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    useSonner.success("Export successful", {
      description: `${rows.length} row(s) exported to CSV.`,
    });
  }

  function escapeCsvValue(value: any): string {
    if (value == null) return '""';
    const str = String(value);
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  }

  function getStatusVariant(
    status: "pending" | "processing" | "success" | "failed"
  ): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case "success":
        return "default";
      case "processing":
        return "secondary";
      case "failed":
        return "destructive";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  }
</script>
