<template>
  <div class="grid overflow-x-auto rounded-md border pb-4">
    <UiTable>
      <UiTableCaption>A list of your recent invoices.</UiTableCaption>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[100px]">Invoice</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead>Method</UiTableHead>
          <UiTableHead class="text-right">Amount</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody class="last:border-b">
        <template v-for="invoice in invoices" :key="invoice.id">
          <UiTableRow>
            <UiTableCell class="font-medium">{{ invoice.invoice }} </UiTableCell>
            <UiTableCell>{{ invoice.paymentStatus }}</UiTableCell>
            <UiTableCell>{{ invoice.paymentMethod }}</UiTableCell>
            <UiTableCell class="text-right">{{ formatCurrency(invoice.totalAmount) }}</UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
      <UiTableFooter>
        <UiTableRow>
          <UiTableCell colspan="3">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data: invoices } = await useAsyncData(async () => {
    return Array.from({ length: 7 }, (item, index) => ({
      invoice: `INV00${index + 1}`,
      paymentStatus: faker.helpers.arrayElement(["Paid", "Pending", "Unpaid"]),
      totalAmount: faker.number.float({ fractionDigits: 2, min: 100, max: 1000 }),
      paymentMethod: faker.helpers.arrayElement(["Credit Card", "PayPal", "Bank Transfer"]),
    }));
  });

  const total = computed(() => {
    return invoices.value?.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
  });

  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
