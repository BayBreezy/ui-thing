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
    <UITable>
      <UITableCaption>A list of your recent invoices.</UITableCaption>
      <UITableHeader>
        <UITableRow>
          <UITableHead class="w-[100px]">Invoice</UITableHead>
          <UITableHead>Status</UITableHead>
          <UITableHead>Method</UITableHead>
          <UITableHead class="text-right">Amount</UITableHead>
        </UITableRow>
      </UITableHeader>
      <UITableBody class="last:border-b">
        <template v-for="(invoice, i) in invoices" :key="invoice.id">
          <UITableRow>
            <UITableCell class="font-medium">{{ invoice.invoice }} </UITableCell>
            <UITableCell>{{ invoice.paymentStatus }}</UITableCell>
            <UITableCell>{{ invoice.paymentMethod }}</UITableCell>
            <UITableCell class="text-right">{{ invoice.totalAmount }}</UITableCell>
          </UITableRow>
        </template>
      </UITableBody>
    </UITable>
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
