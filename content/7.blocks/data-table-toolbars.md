---
title: Data Table - Toolbars
description: "Table toolbar blocks with search and filter chips, faceted filter popovers, a column visibility menu, a date range filter, saved view tabs and a density, page size and export toolbar."
---

The toolbar blocks show the controls that sit above a table. Each one filters a small typed dataset on the client (`tickets`, `members`, `projects`, `orders`, `deals` or `products`), so you can see the pattern end to end and then point it at your own API.

All names, companies and numbers are fictional. Counts and totals are announced through `aria-live` regions, and every control has an accessible label.

## Style One

Search field with status toggle chips. Active filters show up as removable chips below the toolbar, with a clear all link and a live result count.

:BlockShowcase{blockPath="DataTable/TableToolbars/BlockTableToolbars1" component="BlockTableToolbars1" iframeHeight="700px"}

## Style Two

Faceted filters. Role and status buttons open popovers with checkbox lists and per option counts, show how many options are selected and have a reset button.

:BlockShowcase{blockPath="DataTable/TableToolbars/BlockTableToolbars2" component="BlockTableToolbars2" iframeHeight="640px"}

## Style Three

Column visibility. A Columns dropdown toggles each column with checkbox items, keeps at least one column visible and has a show all shortcut.

:BlockShowcase{blockPath="DataTable/TableToolbars/BlockTableToolbars3" component="BlockTableToolbars3" iframeHeight="620px"}

## Style Four

Date range filter. A preset range select and search field filter orders against a reference date, with summary cards for the order count and revenue in range. Pass `today` to change the reference date.

:BlockShowcase{blockPath="DataTable/TableToolbars/BlockTableToolbars4" component="BlockTableToolbars4" iframeHeight="780px"}

## Style Five

Saved views. Tabs apply preset filters with a count on each, and the save view button turns the current search into a new tab.

:BlockShowcase{blockPath="DataTable/TableToolbars/BlockTableToolbars5" component="BlockTableToolbars5" iframeHeight="640px"}

## Style Six

Density toolbar. A toggle group switches between comfortable and compact rows, a select changes the page size and an export button is ready for your handler.

:BlockShowcase{blockPath="DataTable/TableToolbars/BlockTableToolbars6" component="BlockTableToolbars6" iframeHeight="680px"}
