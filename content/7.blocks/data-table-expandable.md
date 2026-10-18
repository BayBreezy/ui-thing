---
title: Data Table - Expandable
description: "Table blocks for richer layouts: expandable detail rows, grouped rows with subtotals, a master detail split, sticky headers and columns, and loading, empty and error states."
---

These blocks go beyond flat rows. Expanding, collapsing and selecting all use plain Vue refs, so you can lift the state into the URL or a store when you need to. The data comes in through typed props (`orders`, `groups`, `contacts`, `rows` or `projects`).

Names, companies and numbers are fictional. Expand buttons set `aria-expanded` and `aria-controls`, selectable rows are keyboard accessible and the sticky table is a focusable, labelled scroll region.

## Style One

Orders with expandable detail rows. A chevron toggles the line items, and expand all and collapse all buttons control every row at once.

:BlockShowcase{blockPath="DataTable/TableExpandable/BlockTableExpandable1" component="BlockTableExpandable1" iframeHeight="640px"}

## Style Two

Budget table grouped by department. Each group row shows subtotals and can be collapsed, team rows are indented and the footer has the grand total.

:BlockShowcase{blockPath="DataTable/TableExpandable/BlockTableExpandable2" component="BlockTableExpandable2" iframeHeight="740px"}

## Style Three

Master detail split. Pick a contact in the table and a sticky card shows their details and recent activity. On small screens the card stacks below the list.

:BlockShowcase{blockPath="DataTable/TableExpandable/BlockTableExpandable3" component="BlockTableExpandable3" iframeHeight="680px"}

## Style Four

Wide table with a sticky header, a pinned first column and a pinned totals row inside a scroll region. It uses a plain table element because sticky positioning needs the scroll container to be the direct parent.

:BlockShowcase{blockPath="DataTable/TableExpandable/BlockTableExpandable4" component="BlockTableExpandable4" iframeHeight="640px"}

## Style Five

Loading, empty and error states. Skeleton rows while loading, an empty state with a call to action and an error state with a retry button. The toggle group is only there to preview each state.

:BlockShowcase{blockPath="DataTable/TableExpandable/BlockTableExpandable5" component="BlockTableExpandable5" iframeHeight="560px"}
