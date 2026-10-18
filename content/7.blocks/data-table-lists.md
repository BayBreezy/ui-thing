---
title: Data Table - Lists
description: "Table blocks for users, team directories, customers, invoices, transactions, API logs, inventory and compact reports, with search, sorting, filters and row actions built on the Table component."
---

These blocks are built on `UiTable` with plain Vue state, so there is no table library to learn. Search, sorting and filters run on the client over typed props like `users`, `customers` or `invoices`. Swap the sample data and the action handlers for your own API, or move to [TanStack Table](/components/tanstacktable) when you need server side paging.

All people, companies and numbers are fictional and the photos are placeholders from Unsplash and Pravatar. Sortable headers use a real button and set `aria-sort`, and every table scrolls inside its card on small screens.

## Style One

Users table with a search field, sortable user and last active columns, role and status badges and a result count that is announced to screen readers.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists1" component="BlockTableLists1" iframeHeight="640px"}

## Style Two

Team directory inside a card, with a department filter, avatar and job title cells, a location column, a row action menu and an invite button.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists2" component="BlockTableLists2" iframeHeight="640px"}

## Style Three

Customers table where the columns are declared in one array. Click any header to sort, with right aligned numbers and currency, search by name or country and totals in the footer.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists3" component="BlockTableLists3" iframeHeight="680px"}

## Style Four

Invoices table with status tabs and counts, color coded status badges, overdue due dates in red, a download action and an outstanding balance footer.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists4" component="BlockTableLists4" iframeHeight="700px"}

## Style Five

Transactions grouped by day. Each day gets a header row with its net total, every row has a category icon and credits are shown in green, with search and a pending badge.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists5" component="BlockTableLists5" iframeHeight="760px"}

## Style Six

API request log in a monospace table. HTTP methods and status codes are color coded, a small bar shows latency and a toggle group filters by method.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists6" component="BlockTableLists6" iframeHeight="640px"}

## Style Seven

Inventory table with product thumbnails, SKUs, a stock progress bar, in stock, low stock and out of stock badges and an alert that counts the products to reorder.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists7" component="BlockTableLists7" iframeHeight="720px"}

## Style Eight

Compact striped table for reports. Dense rows, zebra striping, tabular numbers, change indicators with trend icons and a totals row.

:BlockShowcase{blockPath="DataTable/TableLists/BlockTableLists8" component="BlockTableLists8" iframeHeight="560px"}
