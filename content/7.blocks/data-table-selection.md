---
title: Data Table - Selection
description: "Table blocks for acting on rows: a bulk action bar with select all, row action menus, click to edit cells, inline status selects, select all across pages with a running total and delete confirmation."
---

These blocks cover what happens after you pick a row. State lives in plain refs and every block works on a local copy of its typed prop (`items`, `hooks`, `products`, `tasks`, `invoices` or `keys`), so editing or deleting rows never changes the data you passed in. Swap the handlers for calls to your own API.

All names and numbers are fictional. Checkboxes have accessible names, the header checkbox shows an indeterminate state and selection counts are announced through `aria-live` regions.

## Style One

Selectable table with a select all checkbox, highlighted rows and a bulk bar with archive, delete and clear actions.

:BlockShowcase{blockPath="DataTable/TableSelection/BlockTableSelection1" component="BlockTableSelection1" iframeHeight="640px"}

## Style Two

Row action menu with edit, duplicate, copy ID, pause or resume and a destructive delete item. Duplicating adds a row and deleting removes it.

:BlockShowcase{blockPath="DataTable/TableSelection/BlockTableSelection2" component="BlockTableSelection2" iframeHeight="560px"}

## Style Three

Click to edit cells built on the Editable component. Enter or blur saves, escape cancels and the inventory value total updates as you type.

:BlockShowcase{blockPath="DataTable/TableSelection/BlockTableSelection3" component="BlockTableSelection3" iframeHeight="600px"}

## Style Four

Inline status select in every row with a colored dot for each option and live status counts above the table.

:BlockShowcase{blockPath="DataTable/TableSelection/BlockTableSelection4" component="BlockTableSelection4" iframeHeight="640px"}

## Style Five

Paginated invoices with select all on the page, a banner that offers to select every invoice and a footer that totals the selected amount across pages.

:BlockShowcase{blockPath="DataTable/TableSelection/BlockTableSelection5" component="BlockTableSelection5" iframeHeight="780px"}

## Style Six

Delete confirmation. One alert dialog is shared by every row and by the bulk delete button, names the key being deleted and shows a toast when it is gone.

:BlockShowcase{blockPath="DataTable/TableSelection/BlockTableSelection6" component="BlockTableSelection6" iframeHeight="620px"}
