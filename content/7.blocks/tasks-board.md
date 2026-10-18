---
title: Tasks - Board
description: "Kanban board blocks built on the Draggable component: a classic board with inline add and a move menu, swimlanes, a compact scrolling board, collapsible columns, work in progress limits and a searchable board with filters."
---

These boards use `UiDraggable` (Sortable.js under the hood) with a shared `group`, so cards move between columns. Each board keeps a local copy of its typed `initial` prop, so dragging never changes the data you passed in. Replace the local state with calls to your API in the `change` event.

Drag and drop is a pointer gesture, so the classic board adds a move menu on every card as a keyboard and screen reader alternative. Do the same in your own boards. All names and tasks are fictional and the avatars are placeholders.

## Style One

Classic three column board. Drag cards between columns, move them with the menu, add a card inline and see counts, labels, due dates and assignees.

:BlockShowcase{blockPath="Tasks/Board/BlockBoard1" component="BlockBoard1" iframeHeight="780px"}

## Style Two

Swimlanes. Rows are priorities and columns are statuses, with a draggable list in every cell. Lanes can be collapsed.

:BlockShowcase{blockPath="Tasks/Board/BlockBoard2" component="BlockBoard2" iframeHeight="860px"}

## Style Three

Compact board with fixed width columns in a keyboard scrollable region, dense cards with a priority bar, comment and file counts and a drag handle.

:BlockShowcase{blockPath="Tasks/Board/BlockBoard3" component="BlockBoard3" iframeHeight="640px"}

## Style Four

Collapsible columns. Each column folds into a slim vertical strip with its count, so the columns you care about get more room.

:BlockShowcase{blockPath="Tasks/Board/BlockBoard4" component="BlockBoard4" iframeHeight="620px"}

## Style Five

Work in progress limits. Headers show count and limit, columns turn amber when full and refuse more cards until something moves on.

:BlockShowcase{blockPath="Tasks/Board/BlockBoard5" component="BlockBoard5" iframeHeight="720px"}

## Style Six

Board with search, assignee and label filters, a result count and an empty message. Cards that do not match are hidden but keep their place.

:BlockShowcase{blockPath="Tasks/Board/BlockBoard6" component="BlockBoard6" iframeHeight="720px"}
