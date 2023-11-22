---
title: Table
description: A responsive table component.
---

## Source code

Click :SourceCodeLink{component="Table"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add table
```

## Usage

### Basic example

::ShowCase{component="DocsTable"}

#code

```vue [DocsTable.vue]
<template>
  <div class="overflow-x-auto rounded-md border pb-4">
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
        <template v-for="(invoice, i) in invoices" :key="invoice.id">
          <UiTableRow>
            <UiTableCell class="font-medium">{{ invoice.invoice }} </UiTableCell>
            <UiTableCell>{{ invoice.paymentStatus }}</UiTableCell>
            <UiTableCell>{{ invoice.paymentMethod }}</UiTableCell>
            <UiTableCell class="text-right">{{ invoice.totalAmount }}</UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
    </UiTable>
  </div>
</template>

<script lang="ts" setup>
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
</script>
```

::
